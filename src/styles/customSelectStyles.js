const customSelectStyles = (errors = {}, fieldName = '') => ({
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999, // Ensures it's above the modal
  }),

  menu: (base) => ({
    ...base,
    maxHeight: 130,
    overflowY: 'auto',
    zIndex: 1051,
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: 130,
    overflowY: 'auto',
    padding: 0,
  }),

  control: (base, state) => ({
    ...base,
    borderColor: errors[fieldName] ? 'red' : '#ccf6fb',
    boxShadow: state.isFocused ? '0 0 0 2px #ccf6fb' : 'none',
    '&:hover': {
      borderColor: errors[fieldName] ? 'red' : '#86b7fe',
    },
  }),

  option: (base, state) => ({
    ...base,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    lineHeight: '1.2',
    fontSize: '14px',
    backgroundColor: state.isSelected
      ? '#92e6f5'
      : state.isFocused
      ? '#ccf6fb'
      : 'white',
    color: state.isSelected ? 'white' : 'black',
    ':active': {
      backgroundColor: '#92e6f5',
    },
  }),
});

export default customSelectStyles;
