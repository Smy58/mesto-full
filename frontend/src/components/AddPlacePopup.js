import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {
    const [name, setName] = React.useState();
    const [link, setLink] = React.useState();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace({
          name,
          link,
        })
            .then(() => {
                props.onClose();
            });
    }
    
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    return (
        <>
            <PopupWithForm onClose={props.onClose} isOpen={props.isOpen} name="add-form" title="Новое место" onSubmit={handleSubmit}>
                <label className="form__field">
                    <input value={name} onChange={handleChangeName} id="postName-input" name="postName" className="form__input" type="text" placeholder="Название" required minLength='2' maxLength='30'/>
                    <span className='form__input-error' id='postName-input-error'></span>
                </label>
                <label className="form__field">
                    <input value={link} onChange={handleChangeLink} id="postLink-input" name="postLink" className="form__input" type="url" placeholder="Ссылка на картинку" required/>
                    <span className='form__input-error' id='postLink-input-error'></span>
                </label>
            </PopupWithForm>
        </>
     );
}
  
export default AddPlacePopup;