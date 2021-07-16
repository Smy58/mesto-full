import React from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name,
          about: description,
        })
            .then(() => {
                props.onClose();
            });
    }
    
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    return (
        <>
            <PopupWithForm onClose={props.onClose} isOpen={props.isOpen} name="edit-form" title="Редактировать профиль" onSubmit={handleSubmit}>
                <label className="form__field">
                    <input value={name} onChange={handleChangeName} id="full-name-input" name="name" className="form__input" type="text" required minLength='2' maxLength='40' placeholder='Имя'/>
                    <span className='form__input-error' id='full-name-input-error'></span>
                </label>
                <label className="form__field">
                    <input value={description} onChange={handleChangeDescription} id="bio-input" name="bio" className="form__input" type="text" required minLength='2' maxLength='20' placeholder='О себе'/>
                    <span className='form__input-error' id='bio-input-error'></span>
                </label>
            </PopupWithForm>
        </>
     );
}
  
export default EditProfilePopup;