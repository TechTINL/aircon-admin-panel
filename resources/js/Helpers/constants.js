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

export const statusFilters = [
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

export const staffFilters = [
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
