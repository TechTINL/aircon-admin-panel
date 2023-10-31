export const CLIENT_TYPES = [
  {
    value: 'RESIDENTIAL',
    label: 'Residential',
  },
  {
    value: 'COMMERCIAL',
    label: 'Commercial',
  },
];

export const SERVICE_STATUS_FILTERS = [
  [
    {
      value: 'show_all',
      label: 'Show All',
      checked: false,
    },
  ],
  [
    {
      value: 'unassigned',
      label: 'Unassigned',
      checked: false,
    },
    {
      value: 'on_hold',
      label: 'On-Hold',
      checked: false,
    },
  ],
  [
    {
      value: 'scheduled',
      label: 'Scheduled',
      checked: false,
    },
  ],
  [
    {
      value: 'completed',
      label: 'Completed',
      checked: false,
    },
  ],
  [
    {
      value: 'requires_follow_up',
      label: 'Requires Follow-up',
      checked: false,
    },
    {
      value: 'follow_up_completed',
      label: 'Follow-up Completed',
      checked: false,
    },
  ],
];

export const SERVICE_STAFF_FILTERS = [
  [
    {
      value: 'show_all',
      label: 'Show All Staff',
    },
  ],
  [
    {
      value: 'team_leader',
      label: 'Team Leader',
    },
  ],
  [
    {
      value: 'sub_contractor',
      label: 'Sub-Contractor',
    },
  ],
  [
    {
      value: 'technician',
      label: 'Technician',
    },
  ],
  [
    {
      value: 'resigned',
      label: 'Resigned',
    },
  ],
  [
    {
      value: 'on_leave',
      label: 'On Leave',
    },
  ],
];

export const CONTRACT_CLIENT_FILTERS = [
    {
        value: 'all',
        label: 'Show All',
    },
    {
        value: 'client',
        label: 'Client Only',
    },
    {
        value: 'sub_client',
        label: 'Sub-Client Only',
    },
]

export const CLIENTS_FILTERS = [
  [
      {
      value: 'all_clients',
      label: 'All Clients',
    }
  ],
  [
    {
      value: 'deleted_clients',
      label: 'Deleted Clients',
    }
  ]
];

export const clientsData = [
  {
      clientId: {
          id: 'ID123456789',
          name: '1st Aid & Healthcare Learning Centre'
      },
      contactPerson: {
          name: 'Jeffery Hong',
          type: 'Residential'
      },
      contact: '+65 9193 7120',
      address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
      subClients: [
          {
              id: '1',
              name: 'Sub-Clien A'
          },
          {
              id: '2',
              name: 'Sub-Clien B'
          },
          {
              id: '3',
              name: 'Sub-Clien C'
          },
      ],
      billingAddress: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810'
  },
  {
      clientId: {
          id: 'ID123456789',
          name: '1st Aid & Healthcare Learning Centre'
      },
      contactPerson: {
          name: 'Jeffery Hong',
          type: 'Commercial'
      },
      contact: '+65 9193 7120',
      address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
      subClients: [
          {
              id: '1',
              name: 'Sub-Clien A'
          },
          {
              id: '2',
              name: 'Sub-Clien B'
          },
          {
              id: '3',
              name: 'Sub-Clien C'
          },
      ],
      billingAddress: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810'
  },
  {
      clientId: {
          id: 'ID123456789',
          name: '1st Aid & Healthcare Learning Centre'
      },
      contactPerson: {
          name: 'Jeffery Hong',
          type: 'Residential'
      },
      contact: '+65 9193 7120',
      address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
      subClients: [
          {
              id: '1',
              name: 'Sub-Clien A'
          },
          {
              id: '2',
              name: 'Sub-Clien B'
          },
          {
              id: '3',
              name: 'Sub-Clien C'
          },
      ],
      billingAddress: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810'
  },
  {
      clientId: {
          id: 'ID123456789',
          name: '1st Aid & Healthcare Learning Centre'
      },
      contactPerson: {
          name: 'Jeffery Hong',
          type: 'Commercial'
      },
      contact: '+65 9193 7120',
      address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
      subClients: [
          {
              id: '1',
              name: 'Sub-Clien A'
          },
          {
              id: '2',
              name: 'Sub-Clien B'
          },
          {
              id: '3',
              name: 'Sub-Clien C'
          },
      ],
      billingAddress: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810'
  },
  {
      clientId: {
          id: 'ID123456789',
          name: '1st Aid & Healthcare Learning Centre'
      },
      contactPerson: {
          name: 'Jeffery Hong',
          type: 'Residential'
      },
      contact: '+65 9193 7120',
      address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
      subClients: [
          {
              id: '1',
              name: 'Sub-Clien A'
          },
          {
              id: '2',
              name: 'Sub-Clien B'
          },
          {
              id: '3',
              name: 'Sub-Clien C'
          },
      ],
      billingAddress: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810'
  },
  {
      clientId: {
          id: 'ID123456789',
          name: '1st Aid & Healthcare Learning Centre'
      },
      contactPerson: {
          name: 'Jeffery Hong',
          type: 'Commercial'
      },
      contact: '+65 9193 7120',
      address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
      subClients: [
          {
              id: '1',
              name: 'Sub-Clien A'
          },
          {
              id: '2',
              name: 'Sub-Clien B'
          },
          {
              id: '3',
              name: 'Sub-Clien C'
          },
      ],
      billingAddress: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810'
  },
  {
      clientId: {
          id: 'ID123456789',
          name: '1st Aid & Healthcare Learning Centre'
      },
      contactPerson: {
          name: 'Jeffery Hong',
          type: 'Residential'
      },
      contact: '+65 9193 7120',
      address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
      subClients: [
          {
              id: '1',
              name: 'Sub-Clien A'
          },
          {
              id: '2',
              name: 'Sub-Clien B'
          },
          {
              id: '3',
              name: 'Sub-Clien C'
          },
      ],
      billingAddress: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810'
  },
  {
      clientId: {
          id: 'ID123456789',
          name: '1st Aid & Healthcare Learning Centre'
      },
      contactPerson: {
          name: 'Jeffery Hong',
          type: 'Commercial'
      },
      contact: '+65 9193 7120',
      address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
      subClients: [
          {
              id: '1',
              name: 'Sub-Clien A'
          },
          {
              id: '2',
              name: 'Sub-Clien B'
          },
          {
              id: '3',
              name: 'Sub-Clien C'
          },
      ],
      billingAddress: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810'
  },
  {
      clientId: {
          id: 'ID123456789',
          name: '1st Aid & Healthcare Learning Centre'
      },
      contactPerson: {
          name: 'Jeffery Hong',
          type: 'Residential'
      },
      contact: '+65 9193 7120',
      address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
      subClients: [
          {
              id: '1',
              name: 'Sub-Clien A'
          },
          {
              id: '2',
              name: 'Sub-Clien B'
          },
          {
              id: '3',
              name: 'Sub-Clien C'
          },
      ],
      billingAddress: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810'
  },
  {
      clientId: {
          id: 'ID123456789',
          name: '1st Aid & Healthcare Learning Centre'
      },
      contactPerson: {
          name: 'Jeffery Hong',
          type: 'Commercial'
      },
      contact: '+65 9193 7120',
      address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
      subClients: [
          {
              id: '1',
              name: 'Sub-Clien A'
          },
          {
              id: '2',
              name: 'Sub-Clien B'
          },
          {
              id: '3',
              name: 'Sub-Clien C'
          },
      ],
      billingAddress: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810'
  },
];

export const POCData = [
    {
        name: 'POC 1',
        personName: 'Albert',
        phone: '+65 9208 3801',
        email: 'alberts@casuarina.com.sg'
    },
    {
        name: 'POC 1',
        personName: 'Albert',
        phone: '+65 9208 3801',
        email: 'alberts@casuarina.com.sg'
    },
    {
        name: 'POC 1',
        personName: 'Albert',
        phone: '+65 9208 3801',
        email: 'alberts@casuarina.com.sg'
    },
    {
        name: 'POC 1',
        personName: 'Albert',
        phone: '+65 9208 3801',
        email: 'alberts@casuarina.com.sg'
    },
    {
        name: 'POC 1',
        personName: 'Albert',
        phone: '+65 9208 3801',
        email: 'alberts@casuarina.com.sg'
    },
];

export const GeneralNotes = [
    {
        notes: 'Client said to reach 11am not 9am or to look out for spoilt parts',
        dateTime: '3 May 2023, 9:30 AM',
        updatedBy: 'Admin Macy'
    },
    {
        notes: 'Client said to reach 11am not 9am or to look out for spoilt parts',
        dateTime: '3 May 2023, 9:30 AM',
        updatedBy: 'Admin Macy'
    },
    {
        notes: 'Client said to reach 11am not 9am or to look out for spoilt parts',
        dateTime: '3 May 2023, 9:30 AM',
        updatedBy: 'Admin Macy'
    },
    {
        notes: 'Client said to reach 11am not 9am or to look out for spoilt parts',
        dateTime: '3 May 2023, 9:30 AM',
        updatedBy: 'Admin Macy'
    },
    {
        notes: 'Client said to reach 11am not 9am or to look out for spoilt parts',
        dateTime: '3 May 2023, 9:30 AM',
        updatedBy: 'Admin Macy'
    },
    {
        notes: 'Client said to reach 11am not 9am or to look out for spoilt parts',
        dateTime: '3 May 2023, 9:30 AM',
        updatedBy: 'Admin Macy'
    },
    {
        notes: 'Client said to reach 11am not 9am or to look out for spoilt parts',
        dateTime: '3 May 2023, 9:30 AM',
        updatedBy: 'Admin Macy'
    },
];


export const SERVICE_STATUS_LABELS = {
    'UNASSIGNED': 'Unassigned',
    'SCHEDULED': 'Scheduled',
    'ON_HOLD': 'On-Hold',
    'COMPLETED': 'Completed',
    'REQUIRE_FOLLOW_UP': 'Requires Follow-up',
    'FOLLOW_UP_COMPLETED': 'Follow-up Completed'
};

export const EMPLOYEE_STATUS_FILTERS = [
    [
        {
            label: 'Status',
            value: 'status'
        }
    ],
    [
        {
            label: 'Available',
            value: 'available'
        }
    ],
    [
        {
            label: 'On Leave',
            value: 'on_leave'
        }
    ],
]

export const EMPLOYEE_JOB_POSITION_FILTERS = [
    [
        {
            value: 'all',
            label: 'Show All Employee'
        },
    ],
    [
        {
            value: 'admin',
            label: 'Admin'
        },
    ],
    [
        {
            value: 'super_admin',
            label: 'Super Admin'
        },
    ],
    [
        {
            value: 'team_leader',
            label: 'Team Leader'
        },
    ],
    [
        {
            value: 'sub_contractor',
            label: 'Sub-Contractor'
        },
    ],
    [
        {
            value: 'technician',
            label: 'Technician'
        },
    ],
    [
        {
            value: 'part_time_technician',
            label: 'Part-Time Technician'
        },
    ]
]

export const JOB_POSTION = {
    'team_leader': 'Team Leader',
    'admin': 'Admin',
    'super_admin': 'Super Admin',
    'sub_contractor': 'Sub-Contractor',
    'technician': 'Technician',
    'part_time_technician': 'Part-Time Technician'
}

export const JOB_STATUS = {
    'available': 'Available',
    'on_leave': 'On Leave'
}