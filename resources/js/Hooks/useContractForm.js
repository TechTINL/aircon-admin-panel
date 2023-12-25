import { produce } from 'immer';
import { useReducer } from 'react';

function useContractForm({ contractTemplates, contract }) {
  const [form, dispatch] = useReducer(
    produce((draft, action) => {
      switch (action.type) {
        case 'SET_SELECTED_TITLE':
          draft.selected_title = action.payload;
          draft.service_count = action.payload?.service_count;
          break;
        default:
          break;
      }
    }),
    {
      isEdit: !!contract,
      selected_title: contract?.title || '',
      service_count: contract?.service_count || '',
      title_options: contractTemplates.map(template => {
        return {
          ...template,
          value: template.id,
          label: template.name,
        };
      }),
    }
  );

  return {
    form,
    dispatch,
  };
}

export default useContractForm;
