import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import StartScreen from "./pages/Home";
import Perp from "./pages/Perp";
import useHome from "./hooks/useHome";
import useGamePlay from "./hooks/useGamePlay";
import Play from "./pages/Play";
import Finish from "./pages/Finish";

function AppLayout() {
  const { config, handleChange } = useHome();
  const { startPerp, startGame, selectAnswer, setAnswer, game, isLoading } = useGamePlay(config);

  return (
    <Outlet
      context={{
        config,
        handleChange,
        startPerp,
        startGame,
        game,
        selectAnswer,
        setAnswer,
        isLoading,
      }}
    />
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <StartScreen />,
      },
      {
        path: "/perp",
        element: <Perp />,
      },
      {
        path: "/play",
        element: <Play />,
      },
      {
        path: "/finish",
        element: <Finish />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
