// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface Person {
  name: string;
  father: string;
  mother?: string;
  relationLabel?: string;
}

export interface WeddingEvent {
  id: string;
  type: 'main' | 'reception';
  title: string;
  dateTimeISO: string;
  displayDate: string;
  displayTime: string;
  venueName: string;
  address: string;
  mapsUrl: string;
  directionsUrl: string;
  notes: string;
  message?: string;
}

export interface FamilyGroup {
  heading: string;
  names: string[];
}

export interface FirmBranding {
  name: string;
  phones: string[];
}

export interface WeddingConfig {
  couple: {
    groom: Person;
    bride: Person;
  };
  host: { name: string; relation: string };
  brideAddress: string;
  groomAddress: string;
  dua: { arabic: string; english: string };
  theme: {
    primary: string;
    background: string;
    accent: string;
    fontHeading: string;
  };
  mainEventId: string;
  events: WeddingEvent[];
  rsvp: {
    enabled: boolean;
    deadline: string;
    web3formsKey: string;
  };
  familyGroups: FamilyGroup[];
  firmBranding: FirmBranding;
}

// ─── Wedding Data (sourced from PDF) ─────────────────────────────────────────

export const wedding: WeddingConfig = {

  couple: {
    groom: {
      name: 'Haider Ali',
      father: 'Mohd Naim Ahmed',
      relationLabel: 'Son of Mohd Naim Ahmed',
    },
    bride: {
      name: 'Lubna Naaz',
      father: 'Haji Sarfraz Ali',
      relationLabel: 'Daughter of Haji Sarfraz Ali',
    },
  },

  // Host — the person issuing the invitation
  host: {
    name: 'Haji Anwar Ahmed',
    relation: 'Grandfather of the Bride (Nana)',
  },

  // Addresses
  brideAddress: '783/3A, Zaidi Nagar Society, Meerut',
  groomAddress: '696, Siyana, Bulandshahr, Uttar Pradesh',

  // Arabic Wedding Dua (from PDF Page 1)
  dua: {
    arabic: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    english:
      'May Allah bless you both, shower His bounties upon you, and unite you in goodness.',
  },

  theme: {
    primary: '#651F2B',
    background: '#F8F1E5',
    accent: '#B99A59',
    fontHeading: 'Cormorant Garamond',
  },

  mainEventId: 'nikah',

  events: [
    {
      id: 'nikah',
      type: 'main',
      title: 'The Nikah Ceremony',
      dateTimeISO: '2026-11-13T19:00:00+05:30',
      displayDate: 'Friday, 13 November 2026',
      displayTime: '7:00 PM Onwards',
      venueName: 'King Palace',
      address: 'Hapur Road, Phaphunda, Meerut, Uttar Pradesh 245206',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=King+Palace+Hapur+Road+Phaphunda+Meerut',
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=King+Palace+Hapur+Road+Phaphunda+Meerut',
      notes: '',
    },
  ],

  rsvp: {
    enabled: false,
    deadline: '1st November 2026',
    web3formsKey: 'YOUR_ACCESS_KEY_HERE',
  },

  // Page 3 — Family Directory (exactly as in the PDF)
  familyGroups: [
    {
      heading: 'FROM',
      names: ['Zulfukar Ali', 'Haji Sarfraz Ali', 'Javed Ali', 'Haji Parvez Ali'],
    },
    {
      heading: 'WITH THE BEST COMPLIMENTS FROM',
      names: [
        'Mehraj Malik',
        'Haji Jameel Malik',
        'Faisal Malik',
        'Mohd Uvais',
        'Junaid Ali',
        'Abaan Ali',
      ],
    },
    {
      heading: 'BHAATI',
      names: [
        'Dr Sageer Ahmed',
        'Kadeer Ahmed',
        'Late Nafees Ahmed',
        'Late Haji Shabbir Ahmed',
        'Suleman (Guddu)',
      ],
    },
    {
      heading: 'BICHOLIYA',
      names: ['Yaseen Malik', 'Haji Jameel Malik'],
    },
  ],

  // Firm branding (shown at bottom of family directory)
  firmBranding: {
    name: 'Dulhan Suit Emporium™',
    phones: ['9412632467', '7417555742'],
  },
};
