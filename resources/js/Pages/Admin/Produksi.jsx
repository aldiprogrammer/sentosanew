import AdminLayout from "@/Layouts/AdminLayout";
import NewCustomerModal from "@/Components/NewCustomerModal";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Produksi({ produksi, desain, bahan, customer, kode_antrian, kodespk }) {
  const today = new Date().toISOString().split("T")[0];
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    router.get('/produksi', { search }, { preserveState: true, replace: true });
  };

  useEffect(() => {
    const t = setTimeout(() => {
      router.get('/produksi', { search }, { preserveState: true, replace: true });
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  const [selected, setSelected] = useState([])
  const allIds = produksi.data?.map((item) => item.id) || []
  const allSelected = allIds.length > 0 && selected.length === allIds.length

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    setSelected(allSelected ? [] : [...allIds])
  }

  const selectedItems = (produksi.data || []).filter((item) => selected.includes(item.id))
  const totalHarga = selectedItems.reduce((sum, item) => sum + Number(item.total_harga || 0), 0)
  const totalQty = selectedItems.reduce((sum, item) => sum + Number(item.qty || 0), 0)

  const escapeHtml = (value) =>
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')

  const formatReceiptDate = (date = new Date()) =>
    new Intl.DateTimeFormat('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
    }).format(date)

  const formatReceiptTime = (date = new Date()) =>
    new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(date)

  const buildReceiptHtml = (items) => {
    const printedAt = new Date()
    const isMultiple = items.length > 1
    const gtHarga = items.reduce((s, it) => s + Number(it.total_harga || 0), 0)
    const gtQty = items.reduce((s, it) => s + Number(it.qty || 0), 0)

    const itemRows = items.map((item, i) => `
      <tr${i % 2 === 1 ? ' class="alt"' : ''}>
        <td>${escapeHtml(item.kode_spk)}</td>
        <td>${escapeHtml(item.customer?.nama)}</td>
        <td>${escapeHtml(item.bahan?.bahan)}</td>
        <td class="num">${escapeHtml(item.qty)}</td>
        <td class="num">${escapeHtml(item.tinggi)}x${escapeHtml(item.lebar)} ${escapeHtml(item.satuan)}</td>
        <td class="num">Rp ${Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
      </tr>
    `).join('')

    return `
      <!doctype html>
      <html>
        <head>
          <title>Struk Produksi - ${isMultiple ? items.length + ' item' : escapeHtml(items[0].kode_spk)}</title>
          <style>
            @page { size: 80mm auto; margin: 3mm; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 74mm; margin: 0; color: #000; font-family: 'Courier New', monospace; font-size: 10px; line-height: 1.3; }
            .receipt { width: 74mm; padding: 2mm 3mm; }
            .header { text-align: center; margin-bottom: 6px; }
            .header .brand { font-size: 20px; font-weight: 900; letter-spacing: 2px; }
            .header .sub { font-size: 11px; font-weight: 700; }
            .header .contact { font-size: 10px; }
            .divider { border-top: 1px dashed #000; margin: 6px 0; }
            .divider-solid { border-top: 1px solid #000; margin: 6px 0; }
            .info-row { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 2px; }
            .info-row .label { font-weight: 700; }
            .section-title { font-weight: 700; font-size: 11px; margin: 4px 0 3px; }
            table { width: 100%; border-collapse: collapse; font-size: 9px; }
            th, td { padding: 2px 3px; text-align: left; vertical-align: top; }
            thead th { border-bottom: 1px solid #000; font-weight: 700; }
            tbody td { border-bottom: 1px dotted #ccc; }
            .num { text-align: right; font-variant-numeric: tabular-nums; }
            .total-row td { font-weight: 700; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 3px; }
            .total-row .num { font-size: 11px; }
            .footer { text-align: center; margin-top: 8px; font-size: 9px; }
            .signature { display: flex; justify-content: space-between; margin-top: 16px; font-size: 10px; }
            .signature div { text-align: center; }
            .signature .line { margin-top: 24px; width: 80px; border-top: 1px solid #000; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <div class="brand">SENTOSA</div>
              <div class="sub">DIGITAL PRINTING</div>
              <div class="contact">081 - 7368007</div>
            </div>
            <div class="divider"></div>
            <div class="info-row">
              <span class="label">Tanggal</span>
              <span>${escapeHtml(formatReceiptDate(printedAt))} ${escapeHtml(formatReceiptTime(printedAt))}</span>
            </div>
            ${isMultiple ? `
              <div class="section-title">STRUK PRODUKSI (${items.length} item)</div>
            ` : `
              <div class="info-row"><span class="label">No. SPK</span><span>${escapeHtml(items[0].kode_spk)}</span></div>
              <div class="info-row"><span class="label">Customer</span><span>${escapeHtml(items[0].customer?.nama)}</span></div>
              <div class="info-row"><span class="label">Bahan</span><span>${escapeHtml(items[0].bahan?.bahan)}</span></div>
            `}
            <div class="divider"></div>
            <table>
              <thead><tr>
                <th>SPK</th><th>Customer</th><th>Bahan</th><th class="num">Qty</th><th class="num">Ukuran</th><th class="num">Total</th>
              </tr></thead>
              <tbody>${itemRows}</tbody>
              ${isMultiple ? `<tfoot><tr class="total-row">
                <td colspan="3">${items.length} item</td>
                <td class="num">${gtQty}</td><td></td>
                <td class="num">Rp ${gtHarga.toLocaleString('id-ID')}</td>
              </tr></tfoot>` : ''}
            </table>
            <div class="divider"></div>
            <div class="info-row"><span class="label">Total Item</span><span>${items.length}</span></div>
            <div class="info-row"><span class="label">Total Qty</span><span>${gtQty}</span></div>
            <div class="info-row" style="font-size:13px;font-weight:900;margin-top:2px;">
              <span>GRAND TOTAL</span>
              <span>Rp ${gtHarga.toLocaleString('id-ID')}</span>
            </div>
            <div class="divider-solid"></div>
            <div class="signature">
              <div><div>Hormat Kami</div><div class="line"></div></div>
              <div><div>Penerima</div><div class="line"></div></div>
            </div>
            <div class="footer">Terima Kasih Atas Kepercayaan Anda<br>Barang yang sudah dibeli tidak dapat dikembalikan</div>
          </div>
          <script>
            window.addEventListener('load',function(){window.focus();setTimeout(function(){window.print()},300)});
            window.addEventListener('afterprint',function(){window.close()});
          </script>
        </body>
      </html>
    `
  }

  const printReceipt = () => {
    if (selectedItems.length === 0) return
    if (selectedItems.length === 1) {
      const w = window.open('', '_blank', 'width=420,height=640')
      w.document.open(); w.document.write(buildReceiptHtml(selectedItems)); w.document.close()
    } else {
      let idx = 0
      const openNext = () => {
        if (idx >= selectedItems.length) return
        const w = window.open('', '_blank', 'width=420,height=640')
        w.document.open(); w.document.write(buildReceiptHtml([selectedItems[idx]])); w.document.close()
        const t = setInterval(() => { if (w.closed) { clearInterval(t); idx++; openNext() } }, 500)
      }
      openNext()
    }
    setSelected([])
  }

  const printReceiptCombined = () => {
    if (selectedItems.length === 0) return
    const w = window.open('', '_blank', 'width=500,height=700')
    w.document.open(); w.document.write(buildReceiptHtml(selectedItems)); w.document.close()
    setSelected([])
  }

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
    id_desain: "",
    no_antrian: "",
    kode_spk: kodespk,
    alamat: "",
    tanggal: "",
    id_customer: "",
    customer: "",
    kategori_customer: "",
    pilihan_harga: "",
    harga_manual: "",
    id_bahan: "",
    id_kategori_desain: '',
    bahan: "",
    harga_tampil: "",
    keterangan: "",
    satuan: "",
    tinggi: "",
    lebar: "",
    qty: "",
    sisi: "1 SISI",
    catatan: "",
    metode_pengambilan: "",
    tgl_kirim: "",
    pinising: {
      atas: "",
      bawah: "",
      kanan: "",
      kiri: "",
    },
    mata_ayam: [],
  });

  const modalRef = useRef(null);
  const customerModalRef = useRef(null);
  const previewRef = useRef(null);
  const iframeRef = useRef(null);

  const setPreview = (show) => {
    if (show && selectedItems.length > 0) {
      const html = buildReceiptHtml(selectedItems)
      const doc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document
      if (doc) {
        doc.open()
        doc.write(html)
        doc.close()
      }
      previewRef.current?.showModal()
    }
  }

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const openCustomerModal = () => {
    modalRef.current.close();
    customerModalRef.current.showModal();
  };

  const reopenModal = () => {
    modalRef.current.showModal();
  };

  const editmodalRef = useRef(null);
  const openModalEdit = (pd) => {
    editmodalRef.current.showModal();
    const kategoriMap = {
      'Umum': 'harga_umum',
      'Khusus': 'harga_khusus',
      'Member': 'harga_member',
      'Custom': 'harga_custom',
    };
    const kolomHarga = kategoriMap[pd.customer?.kategori] || 'harga_umum';
    const harga = pd.bahan?.[kolomHarga] || pd.bahan?.harga || 0;
    setData({
      id: pd.id,
      id_desain: pd.id_desain,
      no_antrian: pd.no_antrian,
      kode_spk: pd.kode_spk,
      id_customer: pd.id_customer,
      id_kategori_desain: pd.id_kategori_desain,
      customer: pd.customer.nama,
      kategori_customer: pd.customer?.kategori || "",
      pilihan_harga: pd.customer?.kategori || "",
      harga_manual: "",
      bahan: pd.bahan.bahan,
      alamat: pd.customer.alamat,
      id_bahan: pd.id_bahan,
      harga_tampil: harga,
      keterangan: pd.keterangan,
      satuan: pd.satuan,
      tinggi: pd.tinggi,
      lebar: pd.lebar,
      qty: pd.qty,
      sisi: pd.sisi,
      metode_pengambilan: pd.metode_pengantaran,
      tgl_kirim: pd.tgl_kirim,
      pinising: pd.pinising
        ? {
          atas: pd.pinising.atas || "",
          bawah: pd.pinising.bawah || "",
          kanan: pd.pinising.kanan || "",
          kiri: pd.pinising.kiri || "",
        }
        : { atas: "", bawah: "", kanan: "", kiri: "" },
      mata_ayam: pd.mata_ayam
        ? [
          ...(pd.mata_ayam.atas ? ["Atas"] : []),
          ...(pd.mata_ayam.bawah ? ["Bawah"] : []),
          ...(pd.mata_ayam.kiri ? ["Kiri"] : []),
          ...(pd.mata_ayam.kanan ? ["Kanan"] : []),
        ]
        : [],
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post("/produksi", {
      onSuccess: () => {
        console.log("berhasil");
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm("Yakin ingin menghapus")) {
      destroy("/produksi/" + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put("/produksi/" + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  // HANDLE CHANGE UNIVERSAL
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);

    setData(name, value);
  };

  const handleCustomer = (idCustomer) => {
    const cs = customer.find((item) => item.id === Number(idCustomer));
    const ds = desain.find(
      (item) => Number(item.id_customer) === Number(idCustomer)
    );

    if (!cs) return;

    setData((prev) => ({
      ...prev,
      id_desain: ds?.id ?? "",
      id_customer: cs.id,
      no_antrian: ds?.no_antrian ?? kode_antrian,
      alamat: cs.alamat,
      customer: cs.nama,
      kategori_customer: cs.kategori,
      pilihan_harga: cs.kategori,
      id_kategori_desain: ds?.id_kategori_desain ?? "0",
    }));
  };

  const hitungHarga = (bahanId, pilihan) => {
    const bh = bahan.find((item) => item.id === Number(bahanId));
    if (!bh) return 0;

    if (pilihan === 'Custom') return 0;

    const kategoriMap = {
      'Umum': 'harga_umum',
      'Khusus': 'harga_khusus',
      'Member': 'harga_member',
      'Custom': 'harga_custom',
    };

    const kolomHarga = kategoriMap[pilihan] || 'harga_umum';
    return bh[kolomHarga] || bh.harga || 0;
  };

  const handleBahan = (idBahan) => {
    const bh = bahan.find((item) => item.id === Number(idBahan));
    if (!bh) return;

    const harga = hitungHarga(idBahan, data.pilihan_harga);

    setData((prev) => ({
      ...prev,
      id_bahan: idBahan,
      bahan: bh.bahan,
      harga_tampil: harga,
    }));
  };

  const handlePilihanHarga = (pilihan) => {
    setData((prev) => ({
      ...prev,
      pilihan_harga: pilihan,
      harga_manual: "",
      harga_tampil: pilihan === 'Custom' ? 0 : hitungHarga(prev.id_bahan, pilihan),
    }));
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF("l", "mm", "a4");
      doc.setFontSize(16);
      doc.text("Data Produksi", 14, 20);
      doc.setFontSize(10);
      doc.text("Tanggal: " + new Date().toLocaleDateString("id-ID"), 14, 27);
      const rows = produksi.data.map((item, index) => [produksi.from + index, item.kode_spk, item.customer.nama, item.bahan.bahan, item.keterangan, item.satuan, item.tinggi, item.lebar, item.qty, item.sisi, item.metode_pengantaran, item.tgl_kirim]);
      autoTable(doc, { startY: 32, head: [["No", "Kode SPK", "Customer", "Bahan", "Keterangan", "Satuan", "Tinggi", "Lebar", "Qty", "Sisi", "Metode P", "Tgl Kirim"]], body: rows, styles: { fontSize: 7 }, headStyles: { fillColor: [22, 163, 74] }, theme: "grid" });
      doc.save("data_produksi.pdf");
    } catch (error) {
      console.error("Gagal export PDF:", error);
      alert("Gagal mengexport PDF: " + error.message);
    }
  };

  return (
    <>
      <AdminLayout>
        <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
          <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
            <div class="card-body">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h2 class="card-title">Data Produksi</h2>
                <div class="flex gap-2">
                  <button className="btn btn-primary" onClick={exportPDF}>
                    <i className="fas fa-file-pdf"></i> Export PDF
                  </button>
                  <button className="btn btn-success" onClick={openModal}>
                    <i className="fas fa-plus"></i>
                    Tambah Produksi
                  </button>

                  <dialog ref={modalRef} className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      >
                        ✕
                      </button>

                      <h3 className="text-lg font-bold">Form Produksi</h3>

                      <form onSubmit={save}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {/* Customer */}
                          <div className="p-5 bg-base-200 rounded-lg">
                            <div className="grid  md:grid-cols-2 gap-2">
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Customer</span>
                                </div>
                                <select
                                  name="id_customer"
                                  onChange={(e) =>
                                    handleCustomer(e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value="">Pilih Customer</option>
                                  {customer.map((ds, index) => (
                                    <option value={ds.id}>
                                      {ds.nama}
                                    </option>
                                  ))}
                                </select>
                              </label>

                              {/* Kode Antrian */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">
                                    Kode Antrian
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  name="no_antrian"
                                  value={data.no_antrian}
                                  onChange={handleChange}
                                  className="input input-bordered input-success w-full"
                                  placeholder="ANT-00001"
                                  required
                                />
                              </label>

                              {/* No SPK */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">No SPK</span>
                                </div>
                                <input
                                  type="text"
                                  name="kode_spk"
                                  value={data.kode_spk}
                                  onChange={handleChange}
                                  className="input input-bordered input-success w-full"
                                  placeholder="SPK-001"
                                  required
                                />
                              </label>
                              {/* Alamat */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Alamat</span>
                                </div>
                                <textarea
                                  name="alamat"
                                  value={data.alamat}
                                  onChange={handleChange}
                                  className="textarea textarea-bordered textarea-success w-full h-10"
                                  required
                                ></textarea>
                              </label>
                            </div>
                          </div>

                          <div className="p-5 bg-base-200 rounded-lg">
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Tanggal Produksi</span>
                              </div>
                              <input
                                type="date"
                                value={today}
                                className="input input-bordered input-success w-full"
                                disabled
                              />
                            </label>
                            <div className="divider mt-4 mb-6">Pinising</div>
                            <div className="grid grid-cols-2 gap-2">
                              {["atas", "bawah", "kanan", "kiri"].map(
                                (sisi) => (
                                  <label key={sisi} className="form-control">
                                    <div className="label py-1">
                                      <span className="label-text capitalize">
                                        {sisi}
                                      </span>
                                    </div>
                                    <select
                                      value={data.pinising[sisi]}
                                      onChange={(e) => {
                                        const updated = {
                                          ...data.pinising,
                                          [sisi]: e.target.value,
                                        };
                                        setData("pinising", updated);
                                      }}
                                      className="select select-bordered select-success  w-full"
                                    >
                                      <option value="">--</option>
                                      <option value="Kantongan">
                                        Kantongan
                                      </option>
                                      <option value="Lipat Pas Gambar">
                                        Lipat Pas Gambar
                                      </option>
                                      <option value="Potong Pas Gambar">
                                        Potong Pas Gambar
                                      </option>
                                      <option value="Lipat Sisa Putih">
                                        Lipat Sisa Putih
                                      </option>
                                      <option value="Sisa Putih">
                                        Sisa Putih
                                      </option>
                                    </select>
                                  </label>
                                )
                              )}
                            </div>
                          </div>

                        </div>


                        <div className="grid grid-cols-2 gap-2 items-start">
                          <div className="p-5 bg-base-200 rounded-lg mt-2">
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                              {/* Bahan */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Bahan</span>
                                </div>
                                <select
                                  name="id_bahan"
                                  value={data.id_bahan}
                                  onChange={(e) =>
                                    handleBahan(e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value="">Pilih Bahan</option>
                                  {bahan.map((bh, index) => (
                                    <option value={bh.id}>
                                      {bh.kode}-{bh.bahan} - {bh.kategori} {bh.qty == '1' ? '' : <small className="font-bold"> - @{bh.qty}</small>}
                                    </option>
                                  ))}
                                </select>
                              </label>

                              {/* Harga */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Harga</span>
                                </div>
                                <input
                                  type="text"
                                  className="input input-bordered input-success w-full"
                                  value={data.harga_tampil ? 'Rp ' + Number(data.harga_tampil).toLocaleString('id-ID') : ''}
                                  placeholder={data.id_bahan ? 'Pilih harga' : 'Pilih Bahan'}
                                  readOnly
                                />
                                {data.kategori_customer ? (
                                  <div className="mt-2">
                                    <div className="flex gap-3">
                                      <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                          type="radio"
                                          name="pilihan_harga_tambah"
                                          className="radio radio-success radio-xs"
                                          checked={data.pilihan_harga === data.kategori_customer}
                                          onChange={() => handlePilihanHarga(data.kategori_customer)}
                                        />
                                        <span className="text-sm">{data.kategori_customer}</span>
                                      </label>
                                      <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                          type="radio"
                                          name="pilihan_harga_tambah"
                                          className="radio radio-warning radio-xs"
                                          checked={data.pilihan_harga === 'Custom'}
                                          onChange={() => handlePilihanHarga('Custom')}
                                        />
                                        <span className="text-sm">Custom</span>
                                      </label>
                                    </div>
                                    {data.pilihan_harga === 'Custom' && (
                                      <div className="mt-1">
                                        <input
                                          type="text"
                                          className="input input-bordered input-success w-full input-sm"
                                          placeholder="Rp 0"
                                          value={data.harga_manual ? Number(data.harga_manual).toLocaleString('id-ID') : ''}
                                          onChange={(e) => {
                                            const numeric = e.target.value.replace(/\D/g, '');
                                            setData((prev) => ({ ...prev, harga_manual: numeric, harga_tampil: numeric }));
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ) : null}
                              </label>

                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Keterangan</span>
                                </div>
                                <textarea
                                  name="keterangan"
                                  value={data.keterangan}
                                  onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                  }
                                  className="textarea textarea-bordered textarea-success w-full h-10"
                                ></textarea>
                              </label>

                              {/* Satuan */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Satuan</span>
                                </div>
                                <select
                                  name="satuan"
                                  value={data.satuan}
                                  onChange={(e) =>
                                    setData("satuan", e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value="">Pilih Satuan</option>
                                  <option value="Meter">Meter</option>
                                  <option value="Cm">Cm</option>
                                  <option value="Mm">Mm</option>
                                  <option value="Unit">Unit</option>
                                </select>
                              </label>

                              {/* Tinggi */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Tinggi</span>
                                </div>
                                <input
                                  type="number"
                                  name="tinggi"
                                  value={data.tinggi}
                                  onChange={(e) =>
                                    setData("tinggi", e.target.value)
                                  }
                                  className="input input-bordered input-success w-full"
                                  required
                                />
                              </label>

                              {/* Lebar */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Lebar</span>
                                </div>
                                <input
                                  type="number"
                                  name="lebar"
                                  value={data.lebar}
                                  onChange={(e) =>
                                    setData("lebar", e.target.value)
                                  }
                                  className="input input-bordered input-success w-full"
                                  required
                                />
                              </label>

                              {/* Qty */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Qty</span>
                                </div>
                                <input
                                  type="number"
                                  name="qty"
                                  value={data.qty}
                                  onChange={(e) => setData("qty", e.target.value)}
                                  className="input input-bordered input-success w-full"
                                  required
                                />
                              </label>

                              {/* Sisi */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Sisi</span>
                                </div>
                                <select
                                  name="sisi"
                                  value={data.sisi}
                                  onChange={(e) =>
                                    setData("sisi", e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value="">Pilih sisi</option>
                                  <option value="1 SISI">1 SISI</option>
                                  <option value="2 SISI">2 SISI</option>
                                </select>
                              </label>

                              {/* Metode Pengambilan */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">
                                    Metode Pengambilan
                                  </span>
                                </div>
                                <select
                                  name="metode_pengambilan"
                                  value={data.metode_pengambilan}
                                  onChange={(e) =>
                                    setData("metode_pengambilan", e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value="">Pilih Metode</option>
                                  <option value="Diambil Sendiri">
                                    Diambil Sendiri
                                  </option>
                                  <option value="Diantar">Diantar</option>
                                </select>
                              </label>

                              {/* Tanggal Ambil */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">
                                    Tanggal Kirim / Tanggal Ambil
                                  </span>
                                </div>
                                <input
                                  type="date"
                                  name="tgl_ambil"
                                  value={data.tgl_kirim}
                                  onChange={(e) =>
                                    setData("tgl_kirim", e.target.value)
                                  }
                                  className="input input-bordered input-success w-full"
                                  required
                                />
                              </label>
                            </div>
                          </div>

                          <div className="p-5 bg-base-200 rounded-lg mt-2">
                            <div className="divider mt-4 mb-6 ">Mata Ayam</div>
                            <div className="flex flex-wrap gap-4">
                              {["Atas", "Bawah", "Kiri", "Kanan"].map(
                                (sisi) => (
                                  <label
                                    key={sisi}
                                    className="flex items-center gap-2 cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      className="checkbox checkbox-success checkbox-sm"
                                      checked={data.mata_ayam.includes(
                                        sisi
                                      )}
                                      onChange={(e) => {
                                        const updated = e.target.checked
                                          ? [...data.mata_ayam, sisi]
                                          : data.mata_ayam.filter(
                                            (s) => s !== sisi
                                          );
                                        setData("mata_ayam", updated);
                                      }}
                                    />
                                    <span className="text-sm">{sisi}</span>
                                  </label>
                                )
                              )}
                            </div>
                          </div>

                        </div>

                        <div className="mt-4 flex gap-2">
                          <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-success"
                          >
                            <i className="fas fa-file"></i> Simpan
                          </button>

                          <button
                            type="button"
                            onClick={openCustomerModal}
                            className="btn btn-warning"
                          >
                            Tambah Customer
                          </button>

                          <button
                            type="button"
                            onClick={closeModal}
                            className="btn btn-error"
                          >
                            Keluar
                          </button>
                        </div>
                      </form>
                    </div>
                  </dialog>

                  <NewCustomerModal
                    modalRef={customerModalRef}
                    onCancel={reopenModal}
                    onSuccess={reopenModal}
                  />

                  {/* Dialog Edi */}
                  <dialog ref={editmodalRef} className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <button
                        type="button"
                        onClick={closeModalEdit}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      >
                        ✕
                      </button>

                      <h3 className="text-lg font-bold">Edit Produksi</h3>

                      <form onSubmit={update}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {/* Customer */}
                          <div className="p-5 bg-base-200 rounded-lg">
                            <div className="grid  md:grid-cols-2 gap-2">
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Customer</span>
                                </div>
                                <select
                                  name="id_customer"
                                  value={data.id_customer}
                                  onChange={(e) =>
                                    handleCustomer(e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value={data.id_customer}>
                                    {data.customer}
                                  </option>
                                  {customer.map((ds, index) => (
                                    <option value={ds.id}>
                                      {ds.nama}
                                    </option>
                                  ))}
                                </select>
                              </label>

                              {/* Kode Antrian */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">
                                    Kode Antrian
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  name="no_antrian"
                                  value={data.no_antrian}
                                  onChange={handleChange}
                                  className="input input-bordered input-success w-full"
                                  placeholder="ANT-00001"
                                  required
                                />
                              </label>

                              {/* No SPK */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">No SPK</span>
                                </div>
                                <input
                                  type="text"
                                  name="kode_spk"
                                  value={data.kode_spk}
                                  onChange={handleChange}
                                  className="input input-bordered input-success w-full"
                                  placeholder="SPK-001"
                                  required
                                />
                              </label>
                              {/* Alamat */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Alamat</span>
                                </div>
                                <textarea
                                  name="alamat"
                                  value={data.alamat}
                                  onChange={handleChange}
                                  className="textarea textarea-bordered textarea-success w-full h-10"
                                  required
                                ></textarea>
                              </label>
                            </div>
                          </div>

                          <div className="p-5 bg-base-200 rounded-lg">
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Tanggal Produksi</span>
                              </div>
                              <input
                                type="date"
                                value={today}
                                className="input input-bordered input-success w-full"
                                disabled
                              />
                            </label>
                            <div className="divider mt-4 mb-6">Pinising</div>
                            <div className="grid grid-cols-2 gap-2">
                              {["atas", "bawah", "kanan", "kiri"].map(
                                (sisi) => (
                                  <label key={sisi} className="form-control">
                                    <div className="label py-1">
                                      <span className="label-text capitalize text-xs">
                                        {sisi}
                                      </span>
                                    </div>
                                    <select
                                      value={data.pinising[sisi]}
                                      onChange={(e) => {
                                        const updated = {
                                          ...data.pinising,
                                          [sisi]: e.target.value,
                                        };
                                        setData("pinising", updated);
                                      }}
                                      className="select select-bordered select-success  w-full"
                                    >
                                      <option value="">--</option>
                                      <option value="Kantongan">
                                        Kantongan
                                      </option>
                                      <option value="Lipat Pas Gambar">
                                        Lipat Pas Gambar
                                      </option>
                                      <option value="Potong Pas Gambar">
                                        Potong Pas Gambar
                                      </option>
                                      <option value="Lipat Sisa Putih">
                                        Lipat Sisa Putih
                                      </option>
                                      <option value="Sisa Putih">
                                        Sisa Putih
                                      </option>
                                    </select>
                                  </label>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 items-start">
                          <div className="p-5 bg-base-200 rounded-lg mt-2">
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                              {/* Bahan */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Bahan</span>
                                </div>
                                <select
                                  name="id_bahan"
                                  value={data.id_bahan}
                                  onChange={(e) =>
                                    handleBahan(e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value={data.id_bahan}>
                                    {data.bahan}
                                  </option>
                                  {bahan.map((bh, index) => (
                                    <option value={bh.id}>
                                      {bh.bahan} - {bh.kategori}
                                    </option>
                                  ))}
                                </select>
                              </label>

                              {/* Harga */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Harga</span>
                                </div>
                                <input
                                  type="text"
                                  className="input input-bordered input-success w-full"
                                  value={data.harga_tampil ? 'Rp ' + Number(data.harga_tampil).toLocaleString('id-ID') : ''}
                                  placeholder={data.id_bahan ? 'Pilih harga' : 'Pilih Bahan'}
                                  readOnly
                                />
                                {data.kategori_customer ? (
                                  <div className="mt-2">
                                    <div className="flex gap-3">
                                      <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                          type="radio"
                                          name="pilihan_harga_edit"
                                          className="radio radio-success radio-xs"
                                          checked={data.pilihan_harga === data.kategori_customer}
                                          onChange={() => handlePilihanHarga(data.kategori_customer)}
                                        />
                                        <span className="text-sm">{data.kategori_customer}</span>
                                      </label>
                                      <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                          type="radio"
                                          name="pilihan_harga_edit"
                                          className="radio radio-warning radio-xs"
                                          checked={data.pilihan_harga === 'Custom'}
                                          onChange={() => handlePilihanHarga('Custom')}
                                        />
                                        <span className="text-sm">Custom</span>
                                      </label>
                                    </div>
                                    {data.pilihan_harga === 'Custom' && (
                                      <div className="mt-1">
                                        <input
                                          type="text"
                                          className="input input-bordered input-success w-full input-sm"
                                          placeholder="Rp 0"
                                          value={data.harga_manual ? Number(data.harga_manual).toLocaleString('id-ID') : ''}
                                          onChange={(e) => {
                                            const numeric = e.target.value.replace(/\D/g, '');
                                            setData((prev) => ({ ...prev, harga_manual: numeric, harga_tampil: numeric }));
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ) : null}
                              </label>

                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Keterangan</span>
                                </div>
                                <textarea
                                  name="keterangan"
                                  value={data.keterangan}
                                  onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                  }
                                  className="textarea textarea-bordered textarea-success w-full h-10"
                                ></textarea>
                              </label>

                              {/* Satuan */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Satuan</span>
                                </div>
                                <select
                                  name="satuan"
                                  value={data.satuan}
                                  onChange={(e) =>
                                    setData("satuan", e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value="">Pilih Satuan</option>
                                  <option value="Meter">Meter</option>
                                  <option value="Cm">Cm</option>
                                  <option value="Mm">Mm</option>
                                  <option value="Unit">Unit</option>
                                </select>
                              </label>

                              {/* Tinggi */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Tinggi</span>
                                </div>
                                <input
                                  type="number"
                                  name="tinggi"
                                  value={data.tinggi}
                                  onChange={(e) =>
                                    setData("tinggi", e.target.value)
                                  }
                                  className="input input-bordered input-success w-full"
                                  required
                                />
                              </label>

                              {/* Lebar */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Lebar</span>
                                </div>
                                <input
                                  type="number"
                                  name="lebar"
                                  value={data.lebar}
                                  onChange={(e) =>
                                    setData("lebar", e.target.value)
                                  }
                                  className="input input-bordered input-success w-full"
                                  required
                                />
                              </label>

                              {/* Qty */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Qty</span>
                                </div>
                                <input
                                  type="number"
                                  name="qty"
                                  value={data.qty}
                                  onChange={(e) => setData("qty", e.target.value)}
                                  className="input input-bordered input-success w-full"
                                  required
                                />
                              </label>

                              {/* Sisi */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Sisi</span>
                                </div>
                                <select
                                  name="sisi"
                                  value={data.sisi}
                                  onChange={(e) =>
                                    setData("sisi", e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value="">Pilih sisi</option>
                                  <option value="1 SISI">1 SISI</option>
                                  <option value="2 SISI">2 SISI</option>
                                </select>
                              </label>

                              {/* Metode Pengambilan */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">
                                    Metode Pengambilan
                                  </span>
                                </div>
                                <select
                                  name="metode_pengambilan"
                                  value={data.metode_pengambilan}
                                  onChange={(e) =>
                                    setData("metode_pengambilan", e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value="">Pilih Metode</option>
                                  <option value="Diambil Sendiri">
                                    Diambil Sendiri
                                  </option>
                                  <option value="Diantar">Diantar</option>
                                </select>
                              </label>

                              {/* Tanggal Ambil */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">
                                    Tanggal Kirim / Tanggal Ambil
                                  </span>
                                </div>
                                <input
                                  type="date"
                                  name="tgl_ambil"
                                  value={data.tgl_kirim}
                                  onChange={(e) =>
                                    setData("tgl_kirim", e.target.value)
                                  }
                                  className="input input-bordered input-success w-full"
                                  required
                                />
                              </label>
                            </div>
                          </div>

                          <div className="p-5 bg-base-200 rounded-lg mt-2">
                            <div className="divider mt-4 mb-6">Mata Ayam</div>
                            <div className="flex flex-wrap gap-4">
                              {["Atas", "Bawah", "Kiri", "Kanan"].map(
                                (sisi) => (
                                  <label
                                    key={sisi}
                                    className="flex items-center gap-2 cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      className="checkbox checkbox-success checkbox-sm"
                                      checked={data.mata_ayam.includes(
                                        sisi
                                      )}
                                      onChange={(e) => {
                                        const updated = e.target.checked
                                          ? [...data.mata_ayam, sisi]
                                          : data.mata_ayam.filter(
                                            (s) => s !== sisi
                                          );
                                        setData("mata_ayam", updated);
                                      }}
                                    />
                                    <span className="text-sm">{sisi}</span>
                                  </label>
                                )
                              )}
                            </div>
                          </div>

                        </div>

                        <div className="mt-4 flex gap-2">
                          <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-success"
                          >
                            <i className="fas fa-save"></i> Update
                          </button>

                          <button
                            type="button"
                            onClick={closeModalEdit}
                            className="btn btn-warning"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={() => hapus(data.id)}
                            className="btn btn-error"
                          >
                            <i className="fas fa-trash"></i> Hapus
                          </button>
                        </div>
                      </form>
                    </div>
                  </dialog>
                </div>
              </div>

              <div className="mb-3">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Cari produksi..."
                    className="input input-bordered input-success w-full max-w-xs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
              </div>

              {selected.length > 0 && (
                <div className="mb-3 bg-gradient-to-r from-success/10 to-success/5 border border-success/30 rounded-xl px-4 py-3 shadow-sm transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="badge badge-success badge-lg gap-1">
                          <i className="fas fa-check-circle text-xs"></i>
                          {selected.length}
                        </div>
                        <span className="text-base-content/70 font-medium">item dipilih</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-4">
                        <span className="text-base-content/40">|</span>
                        <span className="text-base-content/70">
                          Qty: <strong className="text-base-content">{totalQty}</strong>
                        </span>
                        <span className="text-base-content/40">|</span>
                        <span className="text-base-content/70">
                          Total: <strong className="text-success text-sm">Rp {totalHarga.toLocaleString('id-ID')}</strong>
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn btn-success btn-sm" onClick={printReceipt}>
                        <i className="fas fa-receipt"></i> Cetak Struk
                      </button>
                      <div className="dropdown dropdown-end">
                        <button className="btn btn-success btn-sm btn-outline" tabIndex={0}>
                          <i className="fas fa-chevron-down"></i>
                        </button>
                        <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-100 rounded-xl shadow-lg border border-base-300 z-50 w-48 p-2 mt-1">
                          <li><button onClick={printReceiptCombined}><i className="fas fa-layer-group"></i> Cetak Gabungan</button></li>
                          <li><button onClick={() => setPreview(true)}><i className="fas fa-eye"></i> Preview Struk</button></li>
                          <li><button onClick={() => setSelected([])}><i className="fas fa-times"></i> Batalkan Pilihan</button></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                  <div className="overflow-x-auto">
                  <table className="table table-zebra" id="myTable">
                  <thead>
                    <tr>
                      <th className="w-10">
                        <input type="checkbox" className="checkbox checkbox-sm checkbox-success" checked={allSelected} onChange={toggleSelectAll} />
                      </th>
                      <th>No</th>
                      <th>Kode SPK</th>
                      <th>Customer</th>
                      <th>Bahan</th>
                      <th>Keterangan</th>
                      <th>Tinggi</th>
                      <th>Lebar</th>
                      <th>Qty</th>
                      <th>Sisi</th>
                      <th>Harga</th>
                      <th>Total Harga</th>
                      <th>Metode P</th>
                      <th>Tgl Kirim /Ambil</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {produksi.data.map((item, index) => (
                      <tr
                        key={item.id}
                        onClick={(e) => { if (e.target.type !== 'checkbox') openModalEdit(item) }}
                        className="cursor-pointer hover:bg-base-200"
                      >
                        <td onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="checkbox checkbox-sm checkbox-success" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} />
                        </td>
                        <td>{produksi.from + index}</td>
                        <td>{item.kode_spk}</td>
                        <td>{item.customer.nama}</td>
                        <td>{item.bahan.bahan}</td>
                        <td>{item.keterangan}</td>
                        <td>{item.tinggi} {item.satuan}</td>
                        <td>{item.lebar}</td>
                        <td>{item.qty}</td>
                        <td>{item.sisi}</td>
                        <td>{Number(item.harga_bahan).toLocaleString('id-ID')}</td>
                        <td>{Number(item.total_harga).toLocaleString('id-ID')}</td>
                        <td>{item.metode_pengantaran}</td>
                        <td>{item.tgl_kirim}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>

                {produksi.links && (
                  <div className="flex justify-center mt-4 join">
                    {produksi.links.map((link, i) => (
                      <Link
                        key={i}
                        href={link.url || '#'}
                        className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                        preserveState
                        replace
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <dialog ref={previewRef} className="modal">
          <div className="modal-box w-11/12 max-w-4xl h-[90vh] p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-base-300 bg-base-100 sticky top-0 z-10">
              <h3 className="font-bold text-lg">
                <i className="fas fa-eye text-success"></i> Preview Struk
              </h3>
              <div className="flex gap-2">
                <button className="btn btn-success btn-sm" onClick={() => { previewRef.current?.close(); printReceipt() }}>
                  <i className="fas fa-print"></i> Cetak
                </button>
                <button className="btn btn-ghost btn-sm btn-circle" onClick={() => previewRef.current?.close()}>✕</button>
              </div>
            </div>
            <div className="w-full h-[calc(90vh-60px)]">
              <iframe ref={iframeRef} className="w-full h-full border-none" title="Preview Struk" />
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </AdminLayout>
    </>
  );
}
