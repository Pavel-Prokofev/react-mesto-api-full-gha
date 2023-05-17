import { useNavigate } from "react-router-dom";

function PageNotFound() {

  const navigate = useNavigate();

  const goBack = ()=> {
    navigate(-1, { replace: true });
  }

  return (
    <section className="login">
      <h2 className="title title_authentication" >Чем дальше в лес, тем толще партизаны!</h2>
      <h2 className="title title_authentication button-opacity" onClick={goBack}>Желаете вернуться?</h2>
    </section>
  );
}

export default PageNotFound;