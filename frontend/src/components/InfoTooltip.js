import React from 'react';

function InfoTooltip(props) {

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
    <div className={`popup popup_error ${props.isOpen.tugle && 'popup_opened'}`}>
      <div className="popup__content popup__content_Info-tooltip">
        <button type="button" className="popup__close-button button-opacity"></button>
        {props.isOpen.infoTooltipImg && <img className="popup__sign" src={props.isOpen.infoTooltipImg} alt="знак" />}
        <h2 className="title title_Info-tooltip">{props.isOpen.infoTooltipText}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;

