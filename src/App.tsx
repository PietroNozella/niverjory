import AcceptScaleEnd from "./components/AcceptScaleEnd";
import BirthdayExperience from "./components/BirthdayExperience";
import QRLanding from "./components/QRLanding";

function getCurrentRoute() {
  const path = window.location.pathname.replace(/\/+$/, "");

  return path || "/";
}

export default function App() {
  const route = getCurrentRoute();

  if (route === "/mensagem") {
    return <BirthdayExperience />;
  }

  if (route === "/aceitar") {
    return <AcceptScaleEnd />;
  }

  return <QRLanding />;
}