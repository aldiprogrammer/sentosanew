import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";

export default function PoEksternalDetail({ po, bahans, invoices }) {
  const getHargaRows = (bahan) => bahan?.harga_bahan || bahan?.hargaBahan || [];

  const hargaPoSesuaiQty = (bahan, qty, sisi) => {
    const rows = getHargaRows(bahan);
    if (rows.length === 0) return 0;

    const jumlah = Number(qty || 0);
    const cara = String(bahan?.cara_perhitungan || "").toUpperCase();

    const sisiOptions = [...new Set(rows.map((r) => String(r.sisi || "").trim()).filter(Boolean))];
    const pakaiSisi = sisiOptions.length > 0;

    const cocokSisi = (row) => {
      const sisiHarga = String(row.sisi || "").trim();
      if (pakaiSisi) return sisiHarga.toLowerCase() === String(sisi || "").trim().toLowerCase();

      return sisiHarga === "";
    };

    const urutByQtyMin = (list) =>
      [...list].sort((a, b) => Number(a.qty_min || 0) - Number(b.qty_min || 0));

    const kandidat = rows.filter(cocokSisi);
    if (kandidat.length === 0) return 0;

    if (!jumlah) {
      const base = urutByQtyMin(kandidat)[0];

      return base ? Number(base.harga_po) || 0 : 0;
    }

    const matched = kandidat
      .filter((row) => {
        const qtyMin = Number(row.qty_min || 0);
        const qtyMaxKosong = row.qty_max === null || String(row.qty_max).trim() === "";
        const qtyMax = qtyMaxKosong ? Infinity : Number(row.qty_max);

        if ((cara === "QTY KHUSUS" || cara === "QTY2") && qtyMaxKosong && jumlah !== qtyMin) {
          return false;
        }
        if (jumlah < qtyMin || jumlah > qtyMax) return false;

        return true;
      })
      .sort((a, b) => Number(b.qty_min || 0) - Number(a.qty_min || 0))[0];

    if (matched) return Number(matched.harga_po) || 0;

    const berharga = urutByQtyMin(
      kandidat.filter(
        (r) =>
          r.harga_po !== null && r.harga_po !== undefined && r.harga_po !== "" && Number(r.harga_po) !== 0
      )
    );
    const pool = berharga.length > 0 ? berharga : urutByQtyMin(kandidat);
    const fallback = pool.reduce((acc, cur) => (jumlah >= Number(cur.qty_min || 0) ? cur : acc), null) || pool[0];

    return fallback ? Number(fallback.harga_po) || 0 : 0;
  };

  const hitungHargaPo = (idBahan, qty, sisi) => {
    const bahan = bahans.find((b) => Number(b.id) === Number(idBahan));

    return hargaPoSesuaiQty(bahan, qty, sisi);
  };

  const [selectedInvoice, setSelectedInvoice] = React.useState('');
  const [selectedSpkId, setSelectedSpkId] = React.useState('');

  const uniqueInvoices = React.useMemo(() => {
    const map = new Map();
    invoices.forEach((inv) => {
      if (!map.has(inv.no_invoice)) {
        map.set(inv.no_invoice, {
          no_invoice: inv.no_invoice,
          customer: inv.customer?.nama || '-',
          count: 0,
        });
      }
      map.get(inv.no_invoice).count++;
    });
    return Array.from(map.values());
  }, [invoices]);

  const spkList = React.useMemo(() => {
    if (!selectedInvoice) return [];
    return invoices.filter((inv) => inv.no_invoice === selectedInvoice);
  }, [invoices, selectedInvoice]);

  const handleInvoiceChange = (e) => {
    const noInv = e.target.value;
    setSelectedInvoice(noInv);
    setSelectedSpkId('');
    reset();
    if (noInv) {
      const spks = invoices.filter((inv) => inv.no_invoice === noInv);
      if (spks.length === 1) {
        handleSpkSelect(spks[0]);
      }
    }
  };

  const handleSpkSelect = (inv) => {
    setSelectedSpkId(inv.id);
    setData("invoice", inv.no_invoice);
    setData("id_bahan", inv.id_bahan);
    setData("spk", inv.kode_spk);
    setData("lebar", inv.lebar);
    setData("tinggi", inv.tinggi);
    setData("harga", hitungHargaPo(inv.id_bahan, inv.qty, inv.sisi));
    setData("qty", inv.qty);
    setData("satuan", satuanBahanById(inv.id_bahan));
    setData("satuan_ukuran", inv.satuan || '');
    setData("sisi", inv.sisi || '');
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

  const sisiBySpk = (kodeSpk) => {
    const inv = invoices.find((item) => item.kode_spk === kodeSpk);

    return inv?.sisi || "";
  };

  const customerByInvoice = (invoice) => {
    if (!invoice) return null;
    const inv = invoices.find((item) => item.no_invoice === invoice);

    return inv?.customer?.nama || null;
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
    if (caraPerhitungan === "QTY KHUSUS") {
      const satuan = String(bahan?.satuan || "").toUpperCase();
      if (["PCS", "QTY"].includes(satuan)) return Math.round(nilaiQty * nilaiHarga);
      return Math.round(nilaiHarga);
    }
    if (caraPerhitungan === "QTY2") return Math.round(nilaiQty * nilaiHarga);

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
    sisi: "",
    qty: "",
    harga: "",
    total: "",
    keterangan: "",
  });

  const headerForm = useForm({
    diskon: po.diskon || "",
    diskon_type: po.diskon_type || "persen",
    ppn: po.ppn || "",
  });

  const modalRef = useRef(null);
  const editModalRef = useRef(null);
  const addInvoiceRef = useRef(null);
  const editInvoiceRef = useRef(null);

  const openModal = () => {
    reset();
    setSelectedInvoice('');
    setSelectedSpkId('');
    modalRef.current.showModal();
    setTimeout(() => {
      if (addInvoiceRef.current && window.jQuery) {
        const $el = window.jQuery(addInvoiceRef.current);
        $el.select2({
          placeholder: '-- Pilih Invoice --',
          allowClear: true,
          width: '100%',
          dropdownParent: $el.closest('.modal-box'),
          templateResult: (data) => {
            if (!data.element) return data.text;
            const $el = window.jQuery(data.element);
            const customer = $el.data('customer');
            const count = $el.data('count');
            if (!customer) return data.text;
            return window.jQuery(`<span><b>${data.text.split(' - ')[0]}</b> - ${customer} <span class="badge badge-sm badge-ghost">${count} SPK</span></span>`);
          },
          templateSelection: (data) => {
            if (!data.element) return data.text;
            return data.text.split(' - ').slice(0, 1).join(' - ');
          },
        });
        $el.val(null).trigger('change.select2');
        $el.on('select2:select', function (e) {
          const noInv = String(e.params.data.id);
          setSelectedInvoice(noInv);
          setSelectedSpkId('');
          reset();
          if (noInv) {
            const spks = invoices.filter((inv) => inv.no_invoice === noInv);
            if (spks.length === 1) {
              handleSpkSelect(spks[0]);
            }
          }
        });
        $el.on('select2:clear', function () {
          setSelectedInvoice('');
          setSelectedSpkId('');
          reset();
        });
      }
    }, 100);
  };

  const closeModal = () => {
    if (addInvoiceRef.current && window.jQuery) {
      const $el = window.jQuery(addInvoiceRef.current);
      if ($el.data('select2')) $el.select2('destroy');
    }
    modalRef.current.close();
    setSelectedInvoice('');
    setSelectedSpkId('');
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
      sisi: sisiBySpk(item.spk),
      qty: item.qty?.toString() || "",
      harga: item.harga?.toString() || "",
      total: item.total?.toString() || "",
      keterangan: item.keterangan || "",
    });
    setTimeout(() => {
      if (editInvoiceRef.current && window.jQuery) {
        const $el = window.jQuery(editInvoiceRef.current);
        $el.select2({
          placeholder: '-- Pilih Invoice --',
          allowClear: true,
          width: '100%',
          dropdownParent: $el.closest('.modal-box'),
          templateResult: (data) => {
            if (!data.element) return data.text;
            const $opt = window.jQuery(data.element);
            const customer = $opt.data('customer');
            const count = $opt.data('count');
            if (!customer) return data.text;
            return window.jQuery(`<span><b>${data.text.split(' - ')[0]}</b> - ${customer} <span class="badge badge-sm badge-ghost">${count} SPK</span></span>`);
          },
          templateSelection: (data) => {
            if (!data.element) return data.text;
            return data.text.split(' - ').slice(0, 1).join(' - ');
          },
        });
        $el.val(item.invoice || null).trigger('change.select2');
        $el.on('select2:select', function (e) {
          const noInv = String(e.params.data.id);
          setData("invoice", noInv);
        });
        $el.on('select2:clear', function () {
          setData("invoice", "");
        });
      }
    }, 100);
  };

  const closeModalEdit = () => {
    if (editInvoiceRef.current && window.jQuery) {
      const $el = window.jQuery(editInvoiceRef.current);
      if ($el.data('select2')) $el.select2('destroy');
    }
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

  const formatRp = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "-";
    return "Rp " + num.toLocaleString("id-ID");
  };

  const hitungDiskon = (totalHarga, diskon, diskonType) => {
    const d = parseFloat(diskon || 0);
    if (diskonType === 'rupiah') return d;
    return totalHarga * (d / 100);
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="card-title">Detail PO Eksternal</h2>
              <div className="flex gap-2">
                <a className="btn btn-primary" href={`/po-eksternal/${po.id}/detail/pdf`} target="_blank" rel="noreferrer">
                  <i className="fas fa-file-pdf"></i> Cetak PDF
                </a>
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
                    <th>Customer</th>
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
                      <td colSpan={13} className="text-center py-8 text-base-content/50">
                        Belum ada item. Klik "Tambah Item" untuk menambah.
                      </td>
                    </tr>
                  ) : (
                    po.items.map((item, index) => {
                      const satuanUkuran = satuanProduksiByInvoice(item.invoice);
                      const namaCustomer = customerByInvoice(item.invoice);

                      return (
                        <tr key={item.id} onClick={() => openModalEdit(item)} className="cursor-pointer hover:bg-base-200">
                          <td>{index + 1}</td>
                          <td>{item.invoice || "-"}</td>
                          <td>{namaCustomer || "-"}</td>
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
                    <select
                      className="select select-bordered select-success select-sm w-21 text-xs"
                      value={headerForm.data.diskon_type}
                      onChange={(e) => headerForm.setData("diskon_type", e.target.value)}
                    >
                      <option value="persen">%</option>
                      <option value="rupiah">Rp</option>
                    </select>
                  </div>
                  <div className="text-sm mt-1">
                    - {formatRp(hitungDiskon(parseFloat(po.total_harga || 0), headerForm.data.diskon, headerForm.data.diskon_type))}
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
                    const diskonAmount = hitungDiskon(th, headerForm.data.diskon, headerForm.data.diskon_type);
                    const p = parseFloat(headerForm.data.ppn || 0);
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
                  <select ref={addInvoiceRef} className="select select-bordered select-success w-full">
                    <option value="">-- Pilih Invoice --</option>
                    {uniqueInvoices.map((inv) => (
                      <option key={inv.no_invoice} value={inv.no_invoice} data-customer={inv.customer} data-count={inv.count}>{inv.no_invoice} - {inv.customer} ({inv.count} SPK)</option>
                    ))}
                  </select>
                </label>
                {selectedInvoice && spkList.length > 0 && (
                  <div className="mt-3">
                    <div className="label"><span className="label-text text-xs font-semibold">Pilih SPK ({spkList.length} tersedia)</span></div>
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                      {spkList.map((inv) => (
                        <div
                          key={inv.id}
                          onClick={() => handleSpkSelect(inv)}
                          className={`p-2 rounded-lg border-2 cursor-pointer transition-all ${selectedSpkId === inv.id ? 'border-success bg-success/10' : 'border-base-300 hover:border-primary hover:bg-base-200'}`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-mono font-semibold text-sm">{inv.kode_spk}</span>
                              <span className="text-xs text-base-content/60 ml-2">{inv.bahan?.kode} - {inv.bahan?.bahan}</span>
                              {inv.keterangan && (
                                <div className="text-xs text-base-content/70 mt-1">{inv.keterangan}</div>
                              )}
                            </div>
                            {selectedSpkId === inv.id && <i className="fas fa-check-circle text-success text-sm"></i>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {data.id_bahan && (
                  <>
                    <label className="form-control mt-3">
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
                  </>
                )}
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
                      setData("harga", hitungHargaPo(data.id_bahan, qty, data.sisi));
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
                  <select ref={editInvoiceRef} className="select select-bordered select-success w-full">
                    <option value="">-- Pilih Invoice --</option>
                    {uniqueInvoices.map((inv) => (
                      <option key={inv.no_invoice} value={inv.no_invoice} data-customer={inv.customer} data-count={inv.count}>{inv.no_invoice} - {inv.customer} ({inv.count} SPK)</option>
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
                      setData("harga", hitungHargaPo(data.id_bahan, qty, data.sisi));
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
