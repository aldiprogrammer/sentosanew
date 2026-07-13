import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function SearchableSelect({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const selected = options.find(o => String(o.value) === String(value));

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      <div
        className="input input-bordered input-success w-full flex items-center cursor-pointer justify-between h-auto min-h-[2.5rem] py-1.5"
        onClick={() => { setOpen(!open); setSearch(''); }}
      >
        <span className={`text-xs ${selected ? '' : 'text-gray-400'}`}>{selected ? selected.label : placeholder}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7 7"} /></svg>
      </div>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-box shadow-lg max-h-60 overflow-auto">
          <input
            className="input input-bordered input-sm w-full mb-1 sticky top-0 bg-base-100"
            placeholder="Cari bahan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          {filtered.length === 0 && <p className="p-2 text-sm text-gray-400">Tidak ditemukan</p>}
          {filtered.map(o => (
            <div
              key={o.value}
              className={`px-3 py-2 cursor-pointer text-sm hover:bg-base-300 ${String(o.value) === String(value) ? 'bg-base-300 font-semibold' : ''}`}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const formatSatuan = (satuan) => {
  return satuan === 'M2' ? 'Meter' : (satuan || '-');
};

export default function PoPembelianBahanDetail({ po, bahanpakais }) {
  const { data, setData, post, delete: destroy, put, processing, reset, errors } = useForm({
    id: 0,
    id_bahan: "",
    panjang: "",
    lebar: "",
    luas: "",
    harga: "",
    qty: "",
    total_harga: "",
    satuan: "",
    keterangan: "",
  });

  const headerForm = useForm({
    diskon: po.diskon || "",
    ppn: po.ppn || "",
  });

  const modalRef = useRef(null);
  const editModalRef = useRef(null);
  const stokModalRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [qtyDiterima, setQtyDiterima] = useState('');

  const selectedBahan = bahanpakais.find((b) => b.id == data.id_bahan);

  const hitungLuas = (panjang, lebar) => {
    const p = parseFloat(panjang) || 0;
    const l = parseFloat(lebar) || 0;
    return p * l;
  };

  const hitungTotal = (qty, harga) => {
    const q = parseFloat(qty) || 0;
    const h = parseFloat(harga) || 0;
    return q * h;
  };

  const totalSemua = po.items.reduce((sum, item) => sum + parseFloat(item.total_harga || 0), 0);

  const isLembar = (data.satuan || '').toLowerCase() === 'lembar';

  useEffect(() => {
    if (!isLembar) {
      const luas = hitungLuas(data.panjang, data.lebar);
      setData("luas", luas);
    }
    const total = hitungTotal(data.qty, data.harga);
    setData("total_harga", total);
  }, [data.panjang, data.lebar, data.qty, data.harga, data.satuan]);

  useEffect(() => {
    if (selectedBahan) {
      setData("panjang", selectedBahan.panjang || "");
      setData("lebar", selectedBahan.lebar || "");
      setData("satuan", selectedBahan.satuan || "");
    }
  }, [data.id_bahan]);

  const openModal = () => {
    modalRef.current.showModal();
    reset();
  };

  const closeModal = () => modalRef.current.close();

  const openModalEdit = (item) => {
    editModalRef.current.showModal();
    setData({
      id: item.id,
      id_bahan: item.id_bahan?.toString() || "",
      panjang: item.panjang,
      lebar: item.lebar,
      luas: item.luas,
      harga: item.harga,
      qty: item.qty,
      total_harga: item.total_harga,
      satuan: item.satuan || item.bahan?.satuan || "",
      keterangan: item.keterangan || "",
    });
  };

  const closeModalEdit = () => {
    editModalRef.current.close();
    reset();
  };

  const saveItem = (e) => {
    e.preventDefault();
    post("/po-pembelian-bahan/" + po.id + "/item", {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  const updateItem = (e) => {
    e.preventDefault();
    put("/po-pembelian-bahan/item/" + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  const hapusItem = (id) => {
    if (confirm("Yakin ingin menghapus item ini?")) {
      destroy("/po-pembelian-bahan/item/" + id);
      closeModalEdit();
    }
  };

  const formatRp = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "-";
    return "Rp " + num.toLocaleString("id-ID");
  };

  const cetakPDF = () => {
    const img = new Image();
    img.src = "/logonew.png";
    img.onload = () => {
      try {
        const doc = new jsPDF();
        const pw = doc.internal.pageSize.getWidth();

        // Header
        doc.setFillColor(22, 163, 74);
        doc.rect(0, 0, pw, 52, "F");

        doc.addImage(img, "PNG", pw / 2 - 25, 4, 50, 20);

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont("Helvetica", "bold");
        doc.text("PURCHASE ORDER", pw / 2, 34, { align: "center" });
        doc.setFontSize(8);
        doc.setFont("Helvetica", "normal");
        doc.text("JL. LAKSANA NO.75/73 A MEDAN", pw / 2, 42, { align: "center" });
        doc.text("Telp: 061-7359007", pw / 2, 47, { align: "center" });
        doc.setTextColor(0, 0, 0);

        // Info boxes
        const boxH = 38;
        const colW = (pw - 28) / 2;

        // Left box - PO Info
        doc.setFillColor(245, 245, 245);
        doc.rect(14, 58, colW, boxH, "F");
        doc.setDrawColor(200, 200, 200);
        doc.rect(14, 58, colW, boxH, "S");
        doc.setFontSize(9);
        doc.setFont("Helvetica", "bold");
        doc.text("INFORMASI PO", 18, 66);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9);
        doc.text("No. PO", 18, 75);
        doc.text(":  " + po.no_po, 50, 75);
        doc.text("Tanggal", 18, 83);
        doc.text(":  " + po.tgl, 50, 83);
        doc.text("Hal", 18, 91);
        doc.text(":  " + (po.hal || "-"), 50, 91);

        // Right box - Supplier Info
        doc.setFillColor(245, 245, 245);
        doc.rect(14 + colW + 2, 58, colW - 2, boxH, "F");
        doc.setDrawColor(200, 200, 200);
        doc.rect(14 + colW + 2, 58, colW - 2, boxH, "S");
        doc.setFont("Helvetica", "bold");
        doc.text("SUPPLIER", 14 + colW + 4, 66);
        doc.setFont("Helvetica", "normal");
        doc.text("Nama", 14 + colW + 4, 75);
        doc.text(":  " + (po.suplayer?.nama_suplayer || "-"), 14 + colW + 36, 75);
        doc.text("Pembayaran", 14 + colW + 4, 83);
        doc.text(":  " + (po.pembayaran || "-"), 14 + colW + 36, 83);

        const rows = po.items.map((item, index) => [
          index + 1,
          item.bahan?.kode_bahan || item.bahan?.master_bahan?.keterangan || "-",
          formatSatuan(item.satuan || item.bahan?.satuan),
          item.panjang,
          item.lebar,
          item.luas,
          item.qty,
          parseFloat(item.harga || 0).toLocaleString("id-ID"),
          parseFloat(item.total_harga || 0).toLocaleString("id-ID"),
          item.keterangan || "-",
        ]);

        autoTable(doc, {
          startY: 102,
          head: [["No", "Kode Bahan", "Satuan", "Panjang", "Lebar", "Luas", "Qty", "Harga", "Total Harga", "Keterangan"]],
          body: rows,
          styles: { fontSize: 8, cellPadding: 2 },
          headStyles: { fillColor: [22, 163, 74], textColor: [255, 255, 255], fontSize: 8, fontStyle: "bold" },
          alternateRowStyles: { fillColor: [245, 245, 245] },
          theme: "grid",
          columnStyles: {
            0: { cellWidth: 8, halign: "center" },
            7: { halign: "right" },
            8: { halign: "right" },
          },
        });

        const fy = doc.lastAutoTable.finalY + 8;

        // Summary section
        const sumLeft = 14;
        const sumRight = pw - 14;
        const sumW = sumRight - sumLeft;

        const th = parseFloat(totalSemua || 0);
        const d = parseFloat(po.diskon || 0);
        const p = parseFloat(po.ppn || 0);
        const diskonAmount = th * (d / 100);
        const ppnAmount = th * (p / 100);
        const subTotal = th - diskonAmount + ppnAmount;

        doc.setDrawColor(220, 220, 220);
        doc.setFillColor(248, 248, 248);
        doc.rect(sumLeft, fy, sumW, 34, "FD");

        doc.setFontSize(9);
        doc.setFont("Helvetica", "normal");
        doc.text("Total Harga", sumLeft + 6, fy + 8);
        doc.text("Rp " + th.toLocaleString("id-ID"), sumRight - 6, fy + 8, { align: "right" });

        doc.text("Diskon (" + d + "%)", sumLeft + 6, fy + 15);
        doc.text("- Rp " + diskonAmount.toLocaleString("id-ID"), sumRight - 6, fy + 15, { align: "right" });

        doc.text("PPN (" + p + "%)", sumLeft + 6, fy + 22);
        doc.text("+ Rp " + ppnAmount.toLocaleString("id-ID"), sumRight - 6, fy + 22, { align: "right" });

        doc.setDrawColor(22, 163, 74);
        doc.setFillColor(22, 163, 74);
        doc.rect(sumLeft, fy + 25, sumW, 9, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.text("SUB TOTAL", sumLeft + 6, fy + 32);
        doc.text("Rp " + subTotal.toLocaleString("id-ID"), sumRight - 6, fy + 32, { align: "right" });
        doc.setTextColor(0, 0, 0);

        // Signatures
        // const sigY = fy + 20;
        // doc.setDrawColor(200, 200, 200);
        // doc.setFontSize(9);
        // doc.text("Mengetahui,", 20, sigY);
        // doc.text("Hormat Kami,", pw - 60, sigY);

        // doc.setDrawColor(0, 0, 0);
        // doc.line(20, sigY + 30, 70, sigY + 30);
        // doc.line(pw - 60, sigY + 30, pw - 10, sigY + 30);

        // doc.setFontSize(9);
        // doc.text("( _____________________ )", 20, sigY + 37);
        // doc.text("( _____________________ )", pw - 60, sigY + 37);

        doc.save("po_pembelian_bahan_" + po.no_po + ".pdf");
      } catch (error) {
        console.error("Gagal export PDF:", error);
        alert("Gagal mengexport PDF: " + error.message);
      }
    };
  };

  const cetakLabel = () => {
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pw = doc.internal.pageSize.getWidth();
      const ph = doc.internal.pageSize.getHeight();

      const labelW = 70;
      const labelH = 35;
      const marginX = 8;
      const marginY = 8;
      const cols = Math.floor((pw - marginX * 2) / labelW);
      const gapX = (pw - marginX * 2 - cols * labelW) / (cols - 1 || 1);

      let labelIndex = 0;

      po.items.forEach((item) => {
        const qty = parseInt(item.qty) || 1;
        const kode = item.bahan?.kode_bahan || '-';
        const keterangan = item.bahan?.keterangan || item.bahan?.master_bahan?.keterangan || '-';

        for (let i = 0; i < qty; i++) {
          const col = labelIndex % cols;
          const row = Math.floor(labelIndex / cols);
          const x = marginX + col * (labelW + gapX);
          const y = marginY + row * (labelH + 4);
          const kodeLabel = 'LB' + po.id + '-' + item.id + '-' + (i + 1);

          if (y + labelH > ph) {
            doc.addPage();
            labelIndex = 0;
            continue;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(255, 255, 255);
          doc.rect(x, y, labelW, labelH, 'FD');

          doc.setFontSize(7);
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(100);
          doc.text('PO: ' + po.no_po + ' | ' + kodeLabel, x + 3, y + 6);
          doc.setTextColor(0);

          doc.setFontSize(10);
          doc.setFont('Helvetica', 'bold');
          doc.text(kode, x + 3, y + 14);

          doc.setFontSize(8);
          doc.setFont('Helvetica', 'normal');
          const lines = doc.splitTextToSize(keterangan, labelW - 6);
          doc.text(lines, x + 3, y + 22);

          doc.setFontSize(7);
          doc.setTextColor(100);
          doc.text('#' + (i + 1) + '/' + qty, x + labelW - 12, y + labelH - 4);
          doc.setTextColor(0);

          labelIndex++;
        }
      });

      doc.save('label_bahan_' + po.no_po + '.pdf');
    } catch (error) {
      console.error('Gagal cetak label:', error);
      alert('Gagal mencetak label: ' + error.message);
    }
  };

  const openStokModal = (item, e) => {
    e.stopPropagation();
    setSelectedItem(item);
    const sisa = Number(item.qty) - (item.stok_count || 0);
    setQtyDiterima(String(sisa > 0 ? sisa : item.qty || ''));
    stokModalRef.current.showModal();
  };

  const showSwal = (opts) => {
    return Swal.fire({
      buttonsStyling: false,
      background: '#fff',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-ghost',
        popup: 'shadow-xl',
      },
      ...opts,
    });
  };

  const updateStokItemSubmit = (e) => {
    e.preventDefault();
    stokModalRef.current.close();
    setSelectedItem(null);
    setQtyDiterima('');
    router.put(route('update-stok-item.po-pembelian-bahan', selectedItem.id), {
      qty_diterima: qtyDiterima,
      preserveScroll: true,
      onSuccess: () => setTimeout(() => showSwal({
        icon: 'success',
        title: 'Berhasil',
        text: 'Stok item berhasil diupdate',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }), 150),
      onError: (errors) => {
        const msg = Object.values(errors).flat().join(', ');
        showSwal({
          icon: 'error',
          title: 'Gagal',
          text: msg || 'Terjadi kesalahan',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
    });
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
              <h2 className="card-title">Detail PO Pembelian Bahan</h2>
              <div className="flex gap-2">
                <button className="btn btn-primary" onClick={cetakPDF}>
                  <i className="fas fa-file-pdf"></i> Cetak PDF
                </button>
                <button className="btn btn-info" onClick={() => window.open('/po-pembelian-bahan/' + po.id + '/cetak-label', '_blank')}>
                  <i className="fas fa-tag"></i> Cetak Label
                </button>
                {po.status == 1 ? (
                  <button className="btn btn-warning" onClick={() => router.put(route('tarik-stok.po-pembelian-bahan', po.id), { preserveScroll: true })}>
                    <i className="fas fa-undo"></i> Tarik Stok
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={() => router.put(route('update-stok.po-pembelian-bahan', po.id), { preserveScroll: true })}>
                    <i className="fas fa-box"></i> Update Stok
                  </button>
                )}
                <Link href={route("po-pembelian-bahan")} className="btn btn-sm btn-ghost">
                  <i className="fas fa-arrow-left"></i> Kembali
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 p-4 bg-base-200 rounded-box">
              <div>
                <span className="text-xs text-gray-500">No PO</span>
                <p className="font-semibold">{po.no_po}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Tanggal</span>
                <p className="font-semibold">{po.tgl}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Suplayer</span>
                <p className="font-semibold">{po.suplayer?.nama_suplayer || "-"}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Hal</span>
                <p className="font-semibold">{po.hal || "-"}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Pembayaran</span>
                <p className="font-semibold">{po.pembayaran || "-"}</p>
              </div>
            </div>

            <div className="flex justify-end mb-3">
              <button className="btn btn-success" onClick={openModal}>
                <i className="fas fa-plus"></i> Tambah Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode Bahan</th>
                    <th>Satuan</th>
                    <th>Panjang</th>
                    <th>Lebar</th>
                    <th>Total</th>
                    <th>Harga</th>
                    <th>Qty</th>
                    <th>Total Harga</th>
                    <th>Keterangan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {po.items.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="text-center py-8 text-base-content/50">
                        Belum ada item. Klik "Tambah Item" untuk menambah.
                      </td>
                    </tr>
                  ) : (
                    po.items.map((item, index) => (
                      <tr key={item.id} onClick={() => openModalEdit(item)} className="cursor-pointer hover:bg-base-200">
                        <td>{index + 1}</td>
                        <td>{item.bahan?.kode_bahan || item.bahan?.master_bahan?.keterangan || "-"}</td>
                        <td>{formatSatuan(item.satuan || item.bahan?.satuan)}</td>
                        <td>{item.panjang}</td>
                        <td>{item.lebar}</td>
                        <td>{item.luas} {item.bahan?.satuan}</td>
                        <td>{formatRp(item.harga)}</td>
                        <td>{item.qty}</td>
                        <td>{formatRp(item.total_harga)}</td>
                        <td>{item.keterangan || "-"}</td>
                        <td>
                          {item.stok_count >= Number(item.qty) ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                showSwal({
                                  icon: 'warning',
                                  title: 'Tarik Stok?',
                                  text: `Yakin ingin menarik ${item.stok_count} stok entry untuk item ini?`,
                                  showCancelButton: true,
                                  confirmButtonText: 'Ya, Tarik',
                                  cancelButtonText: 'Batal',
                                  customClass: {
                                    confirmButton: 'btn btn-error',
                                    cancelButton: 'btn btn-ghost',
                                  },
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    router.delete(route('tarik-stok-item.po-pembelian-bahan', item.id), {
                                      preserveScroll: true,
                                      onSuccess: () => {
                                        setTimeout(() => showSwal({
                                          icon: 'success',
                                          title: 'Berhasil',
                                          text: `Stok berhasil ditarik (${item.stok_count} entry)`,
                                          timer: 2000,
                                          timerProgressBar: true,
                                          showConfirmButton: false,
                                        }), 150);
                                      },
                                      onError: (errors) => {
                                        const msg = Object.values(errors).flat().join(', ');
                                        showSwal({
                                          icon: 'error',
                                          title: 'Gagal',
                                          text: msg || 'Terjadi kesalahan',
                                          timer: 2000,
                                          timerProgressBar: true,
                                          showConfirmButton: false,
                                        });
                                      },
                                    });
                                  }
                                });
                              }}
                              className="btn btn-xs btn-warning"
                            >
                              <i className="fas fa-undo"></i> Tarik Stok ({item.stok_count})
                            </button>
                          ) : (
                            <button
                              onClick={(e) => openStokModal(item, e)}
                              className={`btn btn-xs ${item.stok_count > 0 ? 'btn-info' : 'btn-success'}`}
                            >
                              <i className="fas fa-box"></i> Update Stok{item.stok_count > 0 ? ' (+' + (Number(item.qty) - item.stok_count) + ')' : ''}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="divider">Ringkasan Harga</div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="stat bg-base-200 rounded-box p-4">
                <div className="stat-title">Total Harga</div>
                <div className="stat-value text-lg">{formatRp(totalSemua)}</div>
              </div>
              <div className="stat bg-base-200 rounded-box p-4">
                <div className="stat-title">Diskon</div>
                <div className="stat-value text-lg">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="input input-bordered input-success input-sm w-20"
                      value={headerForm.data.diskon}
                      onChange={(e) => headerForm.setData("diskon", e.target.value)}
                    />
                    <span className="text-sm">
                      - {formatRp((() => {
                        const th = parseFloat(totalSemua || 0);
                        const d = parseFloat(headerForm.data.diskon || 0);
                        return th * (d / 100);
                      })())}
                    </span>
                  </div>
                </div>
              </div>
              <div className="stat bg-base-200 rounded-box p-4">
                <div className="stat-title">PPN</div>
                <div className="stat-value text-lg">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="input input-bordered input-success input-sm w-20"
                      value={headerForm.data.ppn}
                      onChange={(e) => headerForm.setData("ppn", e.target.value)}
                    />
                    <span className="text-sm">
                      + {formatRp((() => {
                        const th = parseFloat(totalSemua || 0);
                        const p = parseFloat(headerForm.data.ppn || 0);
                        return th * (p / 100);
                      })())}
                    </span>
                  </div>
                </div>
              </div>
              <div className="stat bg-success/10 rounded-box p-4">
                <div className="stat-title">Sub Total</div>
                <div className="stat-value text-lg text-success">
                  {formatRp((() => {
                    const th = parseFloat(totalSemua || 0);
                    const d = parseFloat(headerForm.data.diskon || 0);
                    const p = parseFloat(headerForm.data.ppn || 0);
                    const diskonAmount = th * (d / 100);
                    const ppnAmount = th * (p / 100);
                    return th - diskonAmount + ppnAmount;
                  })())}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="btn btn-success"
                onClick={() => {
                  headerForm.put("/po-pembelian-bahan/" + po.id + "/header", {
                    preserveScroll: true,
                  });
                }}
                disabled={headerForm.processing}
              >
                <i className="fas fa-save"></i> Simpan Diskon & PPN
              </button>
            </div>
          </div>
        </div>
      </div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-3xl">
          <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-bold mb-4">Tambah Item</h3>
          <form onSubmit={saveItem}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="bg-gray-100 p-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Bahan</span></div>
                  <SearchableSelect
                    options={bahanpakais.map(b => ({ value: b.id, label: `${b.kode_bahan || '-'} - ${b.keterangan || '-'}` }))}
                    value={data.id_bahan}
                    onChange={(val) => setData("id_bahan", val)}
                    placeholder="Pilih Bahan Pakai"
                  />
                  {errors.id_bahan && <span className="text-error text-xs mt-1 block">{errors.id_bahan}</span>}
                </label>
                <label className="form-control mt-2">
                  <div className="label"><span className="label-text">Satuan</span></div>
                  <input type="text" value={formatSatuan(selectedBahan?.satuan)} className="input input-bordered w-full bg-base-200" readOnly />
                </label>
                <label className="form-control mt-2">
                  <div className="label"><span className="label-text">Keterangan</span></div>
                  <textarea value={data.keterangan} className="textarea textarea-bordered textarea-success w-full" onChange={(e) => setData("keterangan", e.target.value)} required></textarea>
                  {errors.keterangan && <span className="text-error text-xs mt-1 block">{errors.keterangan}</span>}
                </label>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <label className="form-control">
                    <div className="label"><span className="label-text">Panjang erer</span></div>
                    <input type="number" step="0.01" value={data.panjang} className="input input-bordered input-success w-full" onChange={(e) => setData("panjang", e.target.value)} />
                    {errors.panjang && <span className="text-error text-xs mt-1 block">{errors.panjang}</span>}
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Lebar</span></div>
                    <input type="number" step="0.01" value={data.lebar} className="input input-bordered input-success w-full" onChange={(e) => setData("lebar", e.target.value)} />
                    {errors.lebar && <span className="text-error text-xs mt-1 block">{errors.lebar}</span>}
                  </label>
                  {isLembar ? (
                    <label className="form-control">
                      <div className="label"><span className="label-text">Jumlah Lembar</span></div>
                      <input type="number" value={data.luas} className="input input-bordered input-success w-full" onChange={(e) => setData("luas", e.target.value)} />
                    </label>
                  ) : (
                    <label className="form-control">
                      <div className="label"><span className="label-text">Luas</span></div>
                      <input type="text" value={data.luas} className="input input-bordered w-full bg-base-200" readOnly />
                    </label>
                  )}
                  <label className="form-control">
                    <div className="label"><span className="label-text">Qty</span></div>
                    <input type="number" step="0.01" value={data.qty} className="input input-bordered input-success w-full" onChange={(e) => setData("qty", e.target.value)} required />
                    {errors.qty && <span className="text-error text-xs mt-1 block">{errors.qty}</span>}
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Harga</span></div>
                    <input type="number" step="0.01" value={data.harga} className="input input-bordered input-success w-full" onChange={(e) => setData("harga", e.target.value)} required />
                    {errors.harga && <span className="text-error text-xs mt-1 block">{errors.harga}</span>}
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Total Harga</span></div>
                    <input type="text" value={data.total_harga} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button type="submit" disabled={processing} className="btn btn-success"><i className="fas fa-save"></i> Simpan</button>
              <button type="button" onClick={closeModal} className="btn btn-error">Batal</button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog ref={editModalRef} className="modal">
        <div className="modal-box max-w-3xl">
          <button type="button" onClick={closeModalEdit} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-bold mb-4">Edit Item</h3>
          <form onSubmit={updateItem}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="bg-gray-100 p-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Bahan</span></div>
                  <SearchableSelect
                    options={bahanpakais.map(b => ({ value: b.id, label: `${b.kode_bahan || '-'} - ${b.keterangan || '-'}` }))}
                    value={data.id_bahan}
                    onChange={(val) => setData("id_bahan", val)}
                    placeholder="Pilih Bahan Pakai"
                  />
                  {errors.id_bahan && <span className="text-error text-xs mt-1 block">{errors.id_bahan}</span>}
                </label>
                <label className="form-control mt-2">
                  <div className="label"><span className="label-text">Satuan</span></div>
                  <input type="text" value={formatSatuan(selectedBahan?.satuan)} className="input input-bordered w-full bg-base-200" readOnly />
                </label>
                <label className="form-control mt-2">
                  <div className="label"><span className="label-text">Keterangan</span></div>
                  <textarea value={data.keterangan} className="textarea textarea-bordered textarea-success w-full" onChange={(e) => setData("keterangan", e.target.value)}></textarea>
                  {errors.keterangan && <span className="text-error text-xs mt-1 block">{errors.keterangan}</span>}
                </label>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <label className="form-control">
                    <div className="label"><span className="label-text">Panjang</span></div>
                    <input type="number" step="0.01" value={data.panjang} className="input input-bordered input-success w-full" onChange={(e) => setData("panjang", e.target.value)} />
                    {errors.panjang && <span className="text-error text-xs mt-1 block">{errors.panjang}</span>}
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Lebar</span></div>
                    <input type="number" step="0.01" value={data.lebar} className="input input-bordered input-success w-full" onChange={(e) => setData("lebar", e.target.value)} />
                    {errors.lebar && <span className="text-error text-xs mt-1 block">{errors.lebar}</span>}
                  </label>
                  {isLembar ? (
                    <label className="form-control">
                      <div className="label"><span className="label-text">Jumlah Lembar</span></div>
                      <input type="number" step="0.01" value={data.luas} className="input input-bordered input-success w-full" onChange={(e) => setData("luas", e.target.value)} />
                    </label>
                  ) : (
                    <label className="form-control">
                      <div className="label"><span className="label-text">Luas</span></div>
                      <input type="text" value={data.luas} className="input input-bordered w-full bg-base-200" readOnly />
                    </label>
                  )}
                  <label className="form-control">
                    <div className="label"><span className="label-text">Qty</span></div>
                    <input type="number" step="0.01" value={data.qty} className="input input-bordered input-success w-full" onChange={(e) => setData("qty", e.target.value)} />
                    {errors.qty && <span className="text-error text-xs mt-1 block">{errors.qty}</span>}
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Harga</span></div>
                    <input type="number" step="0.01" value={data.harga} className="input input-bordered input-success w-full" onChange={(e) => setData("harga", e.target.value)} />
                    {errors.harga && <span className="text-error text-xs mt-1 block">{errors.harga}</span>}
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Total Harga</span></div>
                    <input type="text" value={data.total_harga} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button type="submit" disabled={processing} className="btn btn-success"><i className="fas fa-save"></i> Update</button>
              <button type="button" onClick={closeModalEdit} className="btn btn-warning">Batal</button>
              <button type="button" onClick={() => hapusItem(data.id)} className="btn btn-error"><i className="fas fa-trash"></i> Hapus</button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog ref={stokModalRef} className="modal">
        <div className="modal-box">
          <button type="button" onClick={() => { stokModalRef.current.close(); setSelectedItem(null); }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-bold mb-4">Update Stok Item</h3>
          {selectedItem && (
            <form onSubmit={updateStokItemSubmit}>
              <div className="bg-gray-100 p-4 rounded-lg space-y-3">
                <div>
                  <span className="text-xs text-gray-500">Bahan</span>
                  <p className="font-semibold">{selectedItem.bahan?.kode_bahan || '-'}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Qty PO</span>
                  <p className="font-semibold">{selectedItem.qty}</p>
                </div>
                {selectedItem.stok_count > 0 && (
                  <div>
                    <span className="text-xs text-gray-500">Sudah Diupdate</span>
                    <p className="font-semibold text-info">{selectedItem.stok_count}</p>
                  </div>
                )}
                <label className="form-control">
                  <div className="label"><span className="label-text">Qty Diterima</span></div>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={Number(selectedItem.qty) - (selectedItem.stok_count || 0)}
                    value={qtyDiterima}
                    className="input input-bordered input-success w-full"
                    required
                    onChange={(e) => setQtyDiterima(e.target.value)}
                  />
                  <span className="text-xs text-gray-500 mt-1">Maksimal: {Number(selectedItem.qty) - (selectedItem.stok_count || 0)} (sisa)</span>
                </label>
              </div>
              <div className="mt-6 flex gap-2">
                <button type="submit" className="btn btn-success"><i className="fas fa-box"></i> Update Stok</button>
                <button type="button" onClick={() => { stokModalRef.current.close(); setSelectedItem(null); }} className="btn btn-error">Batal</button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </AdminLayout>
  );
}
