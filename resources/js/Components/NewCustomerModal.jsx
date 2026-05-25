import { useForm } from '@inertiajs/react';
import { useState } from 'react';

function generateKodeCustomer() {
  return 'CS-' + Math.floor(100 + Math.random() * 900);
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 13);
  if (digits.length <= 4) return digits;
  if (digits.length <= 8) return digits.slice(0, 4) + '-' + digits.slice(4);
  return digits.slice(0, 4) + '-' + digits.slice(4, 8) + '-' + digits.slice(8);
}

function formatRupiah(value) {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function NewCustomerModal({ modalRef, onCancel, onSuccess }) {
  const [kodeCustomer, setKodeCustomer] = useState(generateKodeCustomer);
  const { data, setData, post, processing, reset, transform } = useForm({
    nama: '',
    alamat: '',
    nohp: '',
    kategori: '',
    limit: '',
  });

  const closeModal = () => {
    modalRef.current.close();
    reset();
    setKodeCustomer(generateKodeCustomer());
    onCancel?.();
  };

  const save = (e) => {
    e.preventDefault();
    transform((formData) => ({ ...formData, kode: kodeCustomer }));
    post('/customer', {
      preserveScroll: true,
      onSuccess: () => {
        modalRef.current.close();
        reset();
        setKodeCustomer(generateKodeCustomer());
        onSuccess?.();
      },
    });
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <button
          type="button"
          onClick={closeModal}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          x
        </button>

        <h3 className="text-lg font-bold">Tambah Customer</h3>

        <form onSubmit={save}>
          <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">Kode</span>
            </div>
            <input
              type="text"
              value={kodeCustomer}
              className="input input-bordered input-success w-full"
              required
              readOnly
            />
          </label>

          <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">Nama</span>
            </div>
            <input
              type="text"
              value={data.nama}
              className="input input-bordered input-success w-full"
              required
              onChange={(e) => setData('nama', e.target.value)}
            />
          </label>

          <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">No Hp</span>
            </div>
            <input
              type="text"
              value={formatPhone(data.nohp)}
              className="input input-bordered input-success w-full"
              required
              onChange={(e) => setData('nohp', e.target.value.replace(/-/g, ''))}
            />
          </label>

          <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">Kategori</span>
            </div>
            <select
              value={data.kategori}
              className="input input-bordered input-success"
              required
              onChange={(e) => setData('kategori', e.target.value)}
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="Khusus">Khusus</option>
              <option value="Umum">Umum</option>
            </select>
          </label>

          <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">Alamat</span>
            </div>
            <textarea
              className="textarea textarea-bordered textarea-success w-full"
              required
              value={data.alamat}
              onChange={(e) => setData('alamat', e.target.value)}
            ></textarea>
          </label>

          <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">Limit</span>
            </div>
            <input
              type="text"
              value={data.limit ? formatRupiah(String(data.limit)) : ''}
              className="input input-bordered input-success w-full"
              onChange={(e) => setData('limit', e.target.value.replace(/\D/g, ''))}
            />
          </label>

          <div className="mt-4 flex gap-2">
            <button type="submit" disabled={processing} className="btn btn-success">
              Tambah Customer
            </button>

            <button type="button" onClick={closeModal} className="btn btn-error">
              Batal
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
