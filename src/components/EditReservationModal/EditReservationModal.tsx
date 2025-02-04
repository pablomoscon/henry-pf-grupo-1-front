import { useState, useEffect, useContext } from 'react';
import { IReservationEdit } from '@/interfaces/IReserve';
import { UserContext } from '@/contexts/userContext';
import { caretakerService } from '@/services/caretakerServices';
import { UserData } from '@/interfaces/IUser';

interface EditReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reservation: IReservationEdit) => void;
  reservation: IReservationEdit | null;
}

export function EditReservationModal({
  isOpen,
  onClose,
  onSave,
  reservation,
}: EditReservationModalProps) {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    caretakerId: '',
  });
  const [availableCaretakers, setAvailableCaretakers] = useState<UserData[]>(
    []
  );

  // Cargar caretakers y establecer valor inicial
  useEffect(() => {
    const loadData = async () => {
      if (!user?.response?.token || !isOpen) return;

      try {
        const caretakers = await caretakerService.getCaretakers(
          user.response.token
        );
        setAvailableCaretakers(caretakers);

        if (reservation) {
          // Verificamos si reservation.caretakers está definido y tiene elementos
          const caretakerId =
            reservation.caretakers && reservation.caretakers.length > 0
              ? reservation.caretakers[0].id
              : '';
          setFormData({
            caretakerId, // Asignamos el ID del cuidador
          });
        }
      } catch (error) {
        console.error('Error loading caretakers:', error);
      }
    };

    loadData();
  }, [isOpen, user?.response?.token, reservation]);

  const handleSave = async () => {
    try {
      if (!reservation || !formData.caretakerId) {
        console.log('Datos faltantes:', { reservation, formData });
        return;
      }

      console.log('Guardando con:', {
        reservationId: reservation.id,
        caretakerId: formData.caretakerId,
      });

      // Guardamos la reserva con el caretakerId
      await onSave({
        ...reservation,
        caretakers: [{ id: formData.caretakerId }], // Aseguramos que sea un objeto con id
      });

      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  if (!isOpen || !reservation) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-black-light p-6 rounded-lg w-full max-w-md'>
        <h2 className='text-xl text-gold-soft mb-4'>Assign Caretaker</h2>
        <div className='space-y-4'>
          <div>
            <label className='block text-white-ivory mb-2'>
              Assigned Caretaker
            </label>
            <select
              value={formData.caretakerId}
              onChange={(e) => setFormData({ caretakerId: e.target.value })}
              className='w-full p-2 rounded bg-black-dark text-white-ivory border border-gray-700'
            >
              <option value=''>Select Caretaker</option>
              {availableCaretakers.map((caretaker) => (
                <option key={caretaker.id} value={caretaker.id}>
                  {caretaker.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex justify-end space-x-3 mt-6'>
            <button
              onClick={onClose}
              className='px-4 py-2 text-white-ivory hover:bg-gray-700 rounded transition-colors'
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className='px-4 py-2 bg-gold-soft text-black hover:bg-gold-soft/90 rounded transition-colors'
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
