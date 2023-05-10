import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import ImportContactsSharpIcon from '@mui/icons-material/ImportContactsSharp';
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp';
import StarsIcon from '@mui/icons-material/Stars';
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';

export const SidebarData = [
    {
        title:"Home",
        icon:<HomeIcon />,
        link:"/Profile"
    },
    {
        title:"Awards/Achievements",
        icon:<EmojiEventsIcon />,
        link:"/Profile/Awards"
    },
    // {
    //     title:"Achievements",
    //     icon:<StarsIcon />,
    //     link:"/Profile/Achievements"
    // },
    // {
    //     title:"Workshops/Seminar Organised",
    //     icon:<PeopleIcon />,
    //     link:"/Profile/Seminars"
    // },
    {
        title:"Foreign Visits",
        icon:<AirplanemodeActiveOutlinedIcon />,
        link:"/Profile/Foreign"
    },
    {
        title:"Publications/Patents/Journals",
        icon:<ImportContactsSharpIcon />,
        link:"/Profile/Publications"
    },
    {
        title:"Research Projects",
        icon:<CurrencyExchangeSharpIcon />,
        link:"/Profile/Project"
    }
]