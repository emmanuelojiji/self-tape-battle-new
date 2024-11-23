import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Battles from "./pages/battles/Battles";
import Landing from "./pages/landing/Landing";
import SignIn from "./pages/sign_in/SignIn";
import SignUp from "./pages/sign_up/SignUp";
import Battle from "./pages/battle/Battle";
import { UserProvider } from "./contexts/UserContext";
import Onboarding from "./pages/onboarding/Onboarding";
import VideoModal from "./components/VideoModal";
import Profile from "./pages/profile/Profile";
import { useState } from "react";
import { RewardModalProvider } from "./contexts/RewardModalContext";
import ProtectedRoute from "./ProtectedRoute";
import Wallet from "./pages/wallet/Wallet";

function App() {
  return (
    <>
      <UserProvider>
        <RewardModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />

              <Route
                path="/battles"
                element={
                  <ProtectedRoute>
                    <Battles />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/battles/:battleId"
                element={
                  <ProtectedRoute>
                    <Battle />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="/battles/:battleId/:uploadUid"
                  element={<VideoModal />}
                />
              </Route>

              <Route path="/:username" element={<Profile />}>
                <Route
                  path="/:username/:battleId/:uploadUid"
                  element={<VideoModal />}
                />
              </Route>

              <Route path="/wallet" element={<Wallet />} />

              <Route path="/onboarding" element={<Onboarding />} />
            </Routes>
          </BrowserRouter>
        </RewardModalProvider>
      </UserProvider>
    </>
  );
}

export default App;
