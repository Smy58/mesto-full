import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        console.log(avatarRef.current.value);

        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        })
            .then(() => {
                props.onClose();
            });
      }

    return (
        <>
            <PopupWithForm onClose={props.onClose} isOpen={props.isOpen} name="avatar-form" title="Обновить аватар" onSubmit={handleSubmit}>
                <label className="form__field">
                    <input ref={avatarRef} id="avatarLink-input" name="avatarLink" className="form__input" type="url" placeholder="Ссылка на картинку" required/>
                    <span className='form__input-error' id='avatarLink-input-error'></span>
                </label>
            </PopupWithForm>
        </>
     );
}
  
export default EditAvatarPopup;