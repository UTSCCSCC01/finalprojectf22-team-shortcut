import { createTheme } from '@mui/material/styles';

export const light = createTheme({
    palette:{
        mode:'light',
        text:{
            primary:"black",
            secondary:"black",
        },
        background: {
            default:"white",
            paper: {
                primary:"white",
                secondary: "lavender",
                third:"ghostwhite",
                comments:"rgb(223, 228, 233)",
            },
        },
    },
    
});


export const dark = createTheme({
    palette:{
        mode:'dark',
        text:{
            primary:"white",
            secondary:"white",
        },
        background:{
            default:"#121212",
            paper:{
                primary:"rgba(255, 255, 255, 0.08)",
                secondary:"rgba(255, 255, 255, 0.08)",
                third: "#2D3030",
                comments:"grey",
                
            },
        }
    },
});


