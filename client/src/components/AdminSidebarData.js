import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import TourIcon from '@mui/icons-material/Tour';
import ImportContactsSharpIcon from '@mui/icons-material/ImportContactsSharp';
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarsIcon from '@mui/icons-material/Stars';
export const AdminSidebarData = [
    {
        title:"Home",
        icon:<HomeIcon />,
        link:"/Admin",
        fname:"",
    },
    {
        title:"Add new User",
        icon:<EmojiEventsIcon />,
        link:"/Admin/register",
        fname:"",
    },
    {
        title:"Awards",
        icon:<EmojiEventsIcon />,
        link:"/Admin/AdminStudent",
        fname:"",
    },
    {
        title:"Achievements",
        icon:<StarsIcon />,
        link:"/Admin/AdminFaculty",
        fname:""
    },
    {
        title:"Workshops/Seminar Organised",
        icon:<PeopleIcon />,
        link:"/Admin/AdminSeminar",
        fname:""
    },
    {
        title:"Foreign Visits",
        icon:<TourIcon />,
        link:"/Admin/AdminForeign",
        fname:""
    },
    {
        title:"Publications/Patents",
        icon:<ImportContactsSharpIcon />,
        link:"/Admin/AdminPublications",
        fname:""
    },
    {
        title:"Project Grants",
        icon:<CurrencyExchangeSharpIcon />,
        link:"/Admin/AdminProject",
        fname:""
    },
   
]