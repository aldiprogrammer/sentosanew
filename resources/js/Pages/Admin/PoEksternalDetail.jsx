import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function PoEksternalDetail({ po, bahans, invoices }) {
  const getHargaRows = (bahan) => bahan?.harga_bahan || bahan?.hargaBahan || [];

  const hargaPoSesuaiQty = (bahan, qty) => {
    const jumlah = Number(qty || 0);
    const rows = getHargaRows(bahan);

    if (rows.length === 0) return 0;

    if (!jumlah) {
      return [...rows].sort((a, b) => Number(a.qty_min || 0) - Number(b.qty_min || 0))[0]?.harga_po || 0;
    }

    const harga = rows
      .filter((row) => {
        const qtyMin = Number(row.qty_min || 0);
        const qtyMax = row.qty_max === null || String(row.qty_max).trim() === ""
          ? Infinity
          : Number(row.qty_max);

        return jumlah >= qtyMin && jumlah <= qtyMax;
      })
      .sort((a, b) => Number(b.qty_min || 0) - Number(a.qty_min || 0))[0];

    return harga?.harga_po || 0;
  };

  const hitungHargaPo = (idBahan, qty) => {
    const bahan = bahans.find((b) => Number(b.id) === Number(idBahan));

    return hargaPoSesuaiQty(bahan, qty);
  };

  const bahanById = (idBahan) => bahans.find((b) => Number(b.id) === Number(idBahan));

  const bahanLabel = (bahan) => {
    if (!bahan) return "-- Bahan otomatis dari invoice --";

    return `${bahan.kode || "-"} - ${bahan.bahan || "-"}`;
  };

  const bahanLabelById = (idBahan) => {
    const bahan = bahanById(idBahan);

    return bahan ? bahanLabel(bahan) : "";
  };

  const satuanBahan = (item) => item?.bahan?.satuan || item?.satuan || "";

  const satuanBahanById = (idBahan) => {
    const bahan = bahanById(idBahan);

    return bahan?.satuan || "";
  };

  const satuanProduksiByInvoice = (invoice) => {
    const inv = invoices.find((item) => item.no_invoice === invoice);

    return inv?.satuan || "";
  };

  const hitungTotalItem = ({
    idBahan = data.id_bahan,
    tinggi = data.tinggi,
    lebar = data.lebar,
    luas = data.luas,
    qty = data.qty,
    harga = data.harga,
  } = {}) => {
    const bahan = bahanById(idBahan);
    const caraPerhitungan = String(bahan?.cara_perhitungan || "").toUpperCase();
    const nilaiLuas = parseFloat(luas) || hitungLuas(tinggi, lebar);
    const nilaiQty = parseFloat(qty) || 0;
    const nilaiHarga = parseFloat(harga) || 0;

    if (caraPerhitungan === "LUAS") return Math.round(nilaiLuas * nilaiHarga);
    if (caraPerhitungan === "QTY KHUSUS") return Math.round(nilaiHarga);

    return Math.round(nilaiQty * nilaiHarga);
  };

  const {
    data,
    setData,
    post,
    delete: destroy,
    put,
    processing,
    reset,
  } = useForm({
    id: 0,
    invoice: "",
    id_bahan: "",
    spk: "",
    tinggi: "",
    lebar: "",
    luas: "",
    satuan: "",
    satuan_ukuran: "",
    qty: "",
    harga: "",
    total: "",
    keterangan: "",
  });

  const headerForm = useForm({
    diskon: po.diskon || "",
    ppn: po.ppn || "",
  });

  const modalRef = useRef(null);
  const editModalRef = useRef(null);

  const openModal = () => {
    reset();
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const openModalEdit = (item) => {
    editModalRef.current.showModal();
    setData({
      id: item.id,
      invoice: item.invoice || "",
      id_bahan: item.id_bahan?.toString() || "",
      spk: item.spk || "",
      tinggi: item.tinggi?.toString() || "",
      lebar: item.lebar?.toString() || "",
      luas: item.luas?.toString() || "",
      satuan: satuanBahan(item),
      satuan_ukuran: satuanProduksiByInvoice(item.invoice),
      qty: item.qty?.toString() || "",
      harga: item.harga?.toString() || "",
      total: item.total?.toString() || "",
      keterangan: item.keterangan || "",
    });
  };

  const closeModalEdit = () => {
    editModalRef.current.close();
    reset();
  };

  const hitungLuas = (tinggi, lebar) => {
    const t = parseFloat(tinggi) || 0;
    const l = parseFloat(lebar) || 0;
    return Math.round(t * l);
  };

  useEffect(() => {
    const luas = hitungLuas(data.tinggi, data.lebar);
    setData("luas", luas);
  }, [data.tinggi, data.lebar]);

  useEffect(() => {
    const total = hitungTotalItem();
    setData("total", total);
  }, [data.id_bahan, data.luas, data.qty, data.harga]);

  const saveItem = (e) => {
    e.preventDefault();
    post("/po-eksternal/" + po.id + "/item", {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  const updateItem = (e) => {
    e.preventDefault();
    put("/po-eksternal/item/" + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  const hapusItem = (id) => {
    if (confirm("Yakin ingin menghapus item ini?")) {
      destroy("/po-eksternal/item/" + id);
      closeModalEdit();
    }
  };

  const cariInvoice = async (invoice) => {
    if (!invoice) return;
    try {
      const res = await axios.get("/po-eksternal/cari-invoice", { params: { invoice } });
      const d = res.data.data;
      if (d) {
        setData("id_bahan", d.id_bahan);
        setData("spk", d.kode_spk);
        setData("lebar", d.lebar);
        setData("tinggi", d.tinggi);
        setData("harga", hitungHargaPo(d.id_bahan, d.qty));
        setData("qty", d.qty);
        setData("satuan", satuanBahanById(d.id_bahan));
        setData("satuan_ukuran", d.satuan || "");
      }
    } catch { }
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
        doc.text("Mata Uang", 14 + colW + 4, 83);
        doc.text(":  " + (po.mata_uang || "-"), 14 + colW + 36, 83);
        doc.text("Jatuh Tempo", 14 + colW + 4, 91);
        doc.text(":  " + (po.batas_bayar || "-"), 14 + colW + 36, 91);
        doc.text("Pembayaran", 14 + colW + 4, 99);
        doc.text(":  " + (po.pembayaran || "-"), 14 + colW + 36, 99);

        const th = parseFloat(po.total_harga || 0);
        const d = parseFloat(po.diskon || 0);
        const p = parseFloat(po.ppn || 0);
        const diskonAmount = th * (d / 100);
        const ppnAmount = th * (p / 100);
        const subTotal = th - diskonAmount + ppnAmount;

        const rows = po.items.map((item, index) => {
          const sat = satuanProduksiByInvoice(item.invoice)
          return [
            index + 1,
            item.invoice || "-",
            item.bahan?.bahan || "-",
            item.spk || "-",
            item.lebar + (sat ? " " + sat : ""),
            item.tinggi + (sat ? " " + sat : ""),
            item.qty + " " + item.bahan?.satuan,
            parseFloat(item.harga || 0).toLocaleString("id-ID"),
            parseFloat(item.total || 0).toLocaleString("id-ID"),
            item.keterangan || "-",
          ]
        });

        autoTable(doc, {
          startY: 100,
          head: [["No", "Invoice", "Bahan", "SPK", "L", "T", "Qty", "Harga", "Total", "Ktr"]],
          body: rows,
          styles: { fontSize: 7, cellPadding: 2 },
          headStyles: { fillColor: [22, 163, 74], textColor: [255, 255, 255], fontSize: 7, fontStyle: "bold" },
          alternateRowStyles: { fillColor: [245, 245, 245] },
          theme: "grid",
          columnStyles: {
            0: { cellWidth: 8, halign: "center" },
            2: { cellWidth: 50 },
            4: { halign: "center" },
            5: { halign: "center" },
            6: { halign: "center" },
            7: { halign: "center" },
            8: { halign: "right" },
            9: { halign: "right" },
          },
        });

        const fy = doc.lastAutoTable.finalY + 8;

        // Summary section (full width)
        const sumLeft = 14;
        const sumRight = pw - 14;
        const sumW = sumRight - sumLeft;

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

        // Signatures - 3 columns centered
        const sigY = fy + 50;
        const sigColW = (pw - 28) / 3;
        const centers = [14 + sigColW / 2, 14 + sigColW * 1.5, 14 + sigColW * 2.5]

        doc.setDrawColor(0, 0, 0);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9);

        const sigLabels = ["Mengetahui,", "Penerima,", "Hormat Kami,"]
        sigLabels.forEach((label, i) => {
          doc.text(label, centers[i], sigY, { align: "center" })
          doc.line(centers[i] - 30, sigY + 30, centers[i] + 30, sigY + 30)
          doc.setFontSize(8)
          doc.text("( _____________________ )", centers[i], sigY + 37, { align: "center" })
          doc.setFontSize(9)
        })

        doc.save("po_eksternal_" + po.no_po + ".pdf");
      } catch (error) {
        console.error("Gagal export PDF:", error);
        alert("Gagal mengexport PDF: " + error.message);
      }
    };
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="card-title">Detail PO Eksternal</h2>
              <div className="flex gap-2">
                <button className="btn btn-primary" onClick={cetakPDF}>
                  <i className="fas fa-file-pdf"></i> Cetak PDF
                </button>
                <Link href="/po-eksternal" className="btn btn-sm btn-ghost">
                  <i className="fas fa-arrow-left"></i> Kembali
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body p-4">
                  <p className="text-xs text-base-content/50 uppercase tracking-wider">No PO</p>
                  <p className="text-lg font-bold">{po.no_po}</p>
                </div>
              </div>
              <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body p-4">
                  <p className="text-xs text-base-content/50 uppercase tracking-wider">Suplayer</p>
                  <p className="text-lg font-bold">{po.suplayer?.nama_suplayer || "-"}</p>
                </div>
              </div>
              <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body p-4">
                  <p className="text-xs text-base-content/50 uppercase tracking-wider">Tanggal</p>
                  <p className="text-lg font-bold">{po.tgl}</p>
                </div>
              </div>
              <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body p-4">
                  <p className="text-xs text-base-content/50 uppercase tracking-wider">Hal</p>
                  <p className="text-lg font-bold">{po.hal || "-"}</p>
                </div>
              </div>
              <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body p-4">
                  <p className="text-xs text-base-content/50 uppercase tracking-wider">Pembayaran</p>
                  <p className="text-lg font-bold">{po.pembayaran || "-"}</p>
                </div>
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
                    <th>Invoice</th>
                    <th>Bahan</th>
                    <th>SPK</th>
                    <th>Lebar</th>
                    <th>Tinggi</th>
                    <th>Luas</th>
                    {/* <th>Satuan Bahan</th> */}
                    <th>Qty</th>
                    <th>Harga</th>
                    <th>Total</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {po.items.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="text-center py-8 text-base-content/50">
                        Belum ada item. Klik "Tambah Item" untuk menambah.
                      </td>
                    </tr>
                  ) : (
                    po.items.map((item, index) => {
                      const satuanUkuran = satuanProduksiByInvoice(item.invoice);

                      return (
                        <tr key={item.id} onClick={() => openModalEdit(item)} className="cursor-pointer hover:bg-base-200">
                          <td>{index + 1}</td>
                          <td>{item.invoice || "-"}</td>
                          <td>{item.bahan?.bahan || "-"}</td>
                          <td>{item.spk || "-"}</td>
                          <td>{item.lebar}{satuanUkuran ? ` ${satuanUkuran}` : ""}</td>
                          <td>{item.tinggi}{satuanUkuran ? ` ${satuanUkuran}` : ""}</td>
                          <td>{item.luas}{satuanUkuran ? ` ${satuanUkuran}` : ""}</td>
                          {/* <td>{satuanBahan(item) || "-"}</td> */}
                          <td>{item.qty} {item.bahan?.satuan}</td>
                          <td>{formatRp(item.harga)}</td>
                          <td>{formatRp(item.total)}</td>
                          <td>{item.keterangan || "-"}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="divider">Ringkasan Harga</div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="stat bg-base-200 rounded-box p-4">
                <div className="stat-title">Total Harga</div>
                <div className="stat-value text-lg">{formatRp(po.total_harga)}</div>
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
                        const th = parseFloat(po.total_harga || 0);
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
                        const th = parseFloat(po.total_harga || 0);
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
                    const th = parseFloat(po.total_harga || 0);
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
                  headerForm.put("/po-eksternal/" + po.id + "/header", {
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
          <h3 className="text-lg font-bold mb-4">Tambah Item PO</h3>
          <form onSubmit={saveItem}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="bg-gray-100 p-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Invoice</span></div>
                  <select value={data.invoice} className="select select-bordered select-success w-full" onChange={(e) => {
                    const val = e.target.value;
                    setData("invoice", val);
                    const inv = invoices.find((i) => i.no_invoice === val);
                    if (inv) {
                      setData("id_bahan", inv.id_bahan);
                      setData("spk", inv.kode_spk);
                      setData("lebar", inv.lebar);
                      setData("tinggi", inv.tinggi);
                      setData("harga", hitungHargaPo(inv.id_bahan, inv.qty));
                      setData("qty", inv.qty);
                      setData("satuan", satuanBahanById(inv.id_bahan));
                      setData("satuan_ukuran", inv.satuan || '');
                    }
                  }}>
                    <option value="">-- Pilih Invoice --</option>
                    {invoices.map((inv) => (
                      <option key={inv.id} value={inv.no_invoice}>{inv.no_invoice}</option>
                    ))}
                  </select>
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">Kode & Nama Bahan</span></div>
                  <input
                    type="text"
                    value={bahanLabelById(data.id_bahan)}
                    className="input input-bordered w-full bg-base-200"
                    placeholder={bahanLabel(null)}
                    readOnly
                  />
                  {data.id_bahan && (
                    <span className="text-xs text-base-content/60 mt-1 ml-1">
                      Satuan bahan: {satuanBahanById(data.id_bahan) || '-'}
                    </span>
                  )}
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">SPK</span></div>
                  <input type="text" value={data.spk} className="input input-bordered input-success w-full" onChange={(e) => setData("spk", e.target.value)} />
                </label>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <label className="form-control">
                    <div className="label"><span className="label-text">Lebar ({data.satuan_ukuran})</span></div>
                    <input type="number" step="0.01" value={data.lebar} className="input input-bordered input-success w-full" onChange={(e) => setData("lebar", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Tinggi ({data.satuan_ukuran})</span></div>
                    <input type="number" step="0.01" value={data.tinggi} className="input input-bordered input-success w-full" onChange={(e) => setData("tinggi", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Luas ({data.satuan_ukuran})</span></div>
                    <input type="text" value={data.luas} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Satuan Bahan</span></div>
                    <input type="text" value={data.satuan} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Qty</span></div>
                    <input type="number" step="0.01" value={data.qty} className="input input-bordered input-success w-full" onChange={(e) => {
                      const qty = e.target.value;
                      setData("qty", qty);
                      setData("harga", hitungHargaPo(data.id_bahan, qty));
                    }} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Harga PO</span></div>
                    <input type="number" step="0.01" value={data.harga} className="input input-bordered input-success w-full" onChange={(e) => setData("harga", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Total</span></div>
                    <input type="text" value={data.total} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                </div>
                <label className="form-control mt-2">
                  <div className="label"><span className="label-text">Keterangan</span></div>
                  <textarea value={data.keterangan} className="textarea textarea-bordered textarea-success w-full" rows="2" onChange={(e) => setData("keterangan", e.target.value)}></textarea>
                </label>
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
          <h3 className="text-lg font-bold mb-4">Edit Item PO</h3>
          <form onSubmit={updateItem}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="bg-gray-100 p-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Invoice</span></div>
                  <input type="text" value={data.invoice} className="input input-bordered input-success w-full" onChange={(e) => setData("invoice", e.target.value)} />
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">Kode & Nama Bahan</span></div>
                  <input
                    type="text"
                    value={bahanLabelById(data.id_bahan)}
                    className="input input-bordered w-full bg-base-200"
                    placeholder={bahanLabel(null)}
                    readOnly
                  />
                  {data.id_bahan && (
                    <span className="text-xs text-base-content/60 mt-1 ml-1">
                      Satuan bahan: {satuanBahanById(data.id_bahan) || '-'}
                    </span>
                  )}
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">SPK</span></div>
                  <input type="text" value={data.spk} className="input input-bordered input-success w-full" onChange={(e) => setData("spk", e.target.value)} />
                </label>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <label className="form-control">
                    <div className="label"><span className="label-text">Lebar ({data.satuan_ukuran})</span></div>
                    <input type="number" step="0.01" value={data.lebar} className="input input-bordered input-success w-full" onChange={(e) => setData("lebar", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Tinggi ({data.satuan_ukuran})</span></div>
                    <input type="number" step="0.01" value={data.tinggi} className="input input-bordered input-success w-full" onChange={(e) => setData("tinggi", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Luas ({data.satuan_ukuran})</span></div>
                    <input type="text" value={data.luas} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Satuan Bahan</span></div>
                    <input type="text" value={data.satuan} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Qty</span></div>
                    <input type="number" step="0.01" value={data.qty} className="input input-bordered input-success w-full" onChange={(e) => {
                      const qty = e.target.value;
                      setData("qty", qty);
                      setData("harga", hitungHargaPo(data.id_bahan, qty));
                    }} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Harga  PO</span></div>
                    <input type="number" step="0.01" value={data.harga} className="input input-bordered input-success w-full" onChange={(e) => setData("harga", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Total</span></div>
                    <input type="text" value={data.total} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                </div>
                <label className="form-control mt-2">
                  <div className="label"><span className="label-text">Keterangan</span></div>
                  <textarea value={data.keterangan} className="textarea textarea-bordered textarea-success w-full" rows="2" onChange={(e) => setData("keterangan", e.target.value)}></textarea>
                </label>
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
    </AdminLayout>
  );
}
