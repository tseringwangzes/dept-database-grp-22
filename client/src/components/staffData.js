import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import TourIcon from '@mui/icons-material/Tour';
import ImportContactsSharpIcon from '@mui/icons-material/ImportContactsSharp';
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp';
import StarsIcon from '@mui/icons-material/Stars';




export const SidebarData = [
    {
        title:"Home",
        icon:<FontAwesomeIcon icon={faHome} />,
        link:"/StaffHome"
    },
    {
        title:"Department Information",
        icon:<FontAwesomeIcon icon={faHome} />,
        link:"StaffHome/StaffDeptInfo"
    },
    {
        title:"Awards/Achievements",
        icon:<EmojiEventsIcon />,
        link:"/StaffHome/StaffStudent"
    },
    {
        title:"Lecture By Visiting Experts",
        icon:<PeopleIcon />,
        link:"/StaffHome/Seminars",
    },
    {
        title:"Foreign Visits",
        icon:<TourIcon />,
        link:"/StaffHome/StaffForeign"
    },
    {
        title:"Publications/Patents",
        icon:<ImportContactsSharpIcon />,
        link:"/StaffHome/StaffPublications"
    },
    {
        title:"Project Grants",
        icon:<CurrencyExchangeSharpIcon />,
        link:"/StaffHome/StaffProject"
    },
    {
        title:"Send Reminders",
        icon:<FontAwesomeIcon icon={faEnvelope} />,
        link:"/StaffHome/StaffReminder"
    }
]