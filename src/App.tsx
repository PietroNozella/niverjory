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

  return <QRLanding />;
}
