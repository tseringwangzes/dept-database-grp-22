import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import ImportContactsSharpIcon from '@mui/icons-material/ImportContactsSharp';
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarsIcon from '@mui/icons-material/Stars';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Groups2Icon from '@mui/icons-material/Groups2';
export const AdminSidebarData = [
    
    {
        title:"Add new User",
        icon:<PersonAddAltOutlinedIcon />,
        link:"/Admin/register",
        fname:"",
    },
    {
        title:"Awards/Achievements",
        icon:<EmojiEventsIcon />,
        link:"/Admin/AdminStudent",
        fname:"",
    },
    {
        title:"Foreign Visits",
        icon:<AirplanemodeActiveOutlinedIcon />,
        link:"/Admin/AdminForeign",
        fname:""
    },
    {
        title:"Lectures/Workshops",
        icon:<Groups2Icon />,
        link:"/Admin/AdminSeminar",
        fname:"",
    },
    {
        title:"Publications/Patents",
        icon:<ImportContactsSharpIcon />,
        link:"/Admin/AdminPublications",
        fname:""
    },
    {
        title:"Research Projects",
        icon:<CurrencyExchangeSharpIcon />,
        link:"/Admin/AdminProject",
        fname:""
    },
   
]