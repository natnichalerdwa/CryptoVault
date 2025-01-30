import { Button, Typography, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router';
import { i18n } from './i18n';
import React from 'react';

export function App() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  // State to handle selected language
  const [language, setLanguage] = React.useState<string>('en');

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const lang = event.target.value as string;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontSize: "3rem",
          marginBottom: "2rem",
          fontWeight: "bold",
        }}
      >
        {t('appbar.title')}
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/login')}
          sx={{
            textTransform: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            borderColor: "purple",
            color: "purple",
            "&:hover": {
              backgroundColor: "#6a1b9a",
              color: "white",
            },
          }}
        >
          {t('appbar.login.label')}
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate('/signup')}
          sx={{
            textTransform: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            borderColor: "purple",
            color: "purple",
            "&:hover": {
              backgroundColor: "#6a1b9a",
              color: "white",
            },
          }}
        >
          {t('appbar.signup.label')}
        </Button>
      </div>

      {/* language dropdown */}
      <div style={{
        position: "absolute",
        top: "10px",
        right: "10px",
      }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="language-select-label">{"en/es"}</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            label={"language "}
            sx={{
              color: "gray",
              fontSize: "0.9rem",
              padding: "5px",
              borderRadius: "5px",
              borderColor: "purple",
              "& .MuiSelect-icon": {
                color: "purple",
              },
              "&:hover": {
                borderColor: "yellow",
              },
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Español</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Outlet />
    </>
  )
}
// import { Button, Typography } from '@mui/material';
// import Tracker from "./components/Tracker";
// import "./App.css";
// import Home from "./pages/Home";
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { useTranslation } from 'react-i18next';
// import { Outlet } from 'react-router';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignupPage from "./pages/Auth/SignupPage";
// import LoginPage from "./pages/Auth/LoginPage";


// function App() {
//   const { t } = useTranslation('common.json');
//   return (
//     <>
//       <Typography>{t('appbar.title')}</Typography>
//       <Button>{t('appbar.login.label')}</Button>
//       <Button>{t('appbar.signup.label')}</Button>
//       <Outlet></Outlet>
//     </>);
//   (
//     <Router>
//       {/* <div>
//       <h1>CryptoVault - Cryptocurrency Portfolio Manager</h1>
//       <Tracker />
//       </div> */}
//       <Routes>
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/tracker" element={<Tracker />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
