import React from 'react';

function ImagePopup(props) {

  React.useEffect(() => {
    if (props.isOpen) {

      document.addEventListener('click', props.onClose);
      document.addEventListener('keydown', props.onClose);

      return () => {
        document.removeEventListener('click', props.onClose);
        document.removeEventListener('keydown', props.onClose);
      };
    };
  }, [props.isOpen]);

  return (
    <div className={`popup popup_viewing ${props.card.tugle && 'popup_opened'}`}>
      <div className="popup__content-viewing">
        <button type="button" className="popup__close-button button-opacity"></button>
        <figure className="popup__figure">
          <img className="popup__figure-image" src={props.card.data.link} alt={props.card.data.name} />
          <figcaption className="popup__figure-title">{props.card.data.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;

