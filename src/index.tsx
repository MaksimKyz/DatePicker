import React from "react";
import App from "./Components/App";
import './index.css'
import 'overlayscrollbars/css/OverlayScrollbars.min.css'
import { createRoot } from 'react-dom/client';



const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);