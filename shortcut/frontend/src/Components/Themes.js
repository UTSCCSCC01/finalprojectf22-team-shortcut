import { createTheme } from '@mui/material/styles';

export const light = createTheme({
    palette:{
        mode:'light',
        background: {
            default:"white",
            paper: {
                primary:"white",
                secondary: "lavender",
                third:"ghostwhite",
                comments:"rgb(223, 228, 233)",
                box:"aliceblue",
            },
        },
    },
    
});


export const dark = createTheme({
    palette:{
        mode:'dark',
        
        background:{
            default:"#121212",
            paper:{
                primary:"#121212",
                secondary:"rgba(255, 255, 255, 0.08)",
                third: "#2D3030",
                comments:"grey",
                box:"#2D3030",
                
            },
        }
    },
});


