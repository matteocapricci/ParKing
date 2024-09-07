import theme from "../style/palette";

export const textStyle = {
    width: '520px',
    height: '170px'
};

export const heading = {
    color: theme.palette.primary.dark,
};
  
export const displayStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',    
    backgroundColor: theme.palette.info.light
};
  
export const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
    maxHeight: '100vh', 
    backgroundColor: theme.palette.info.light,
    marginBottom: '20px',
    width: '100%',
};
  
export const logoStyle = {
    width: '520px',
    height: '170px',
    marginBottom: '10px'
};
  
export const formContainer = {
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
};

export const form = {
    width: '100%'
};

export const inputGroup = {
    marginBottom: '20px'
};

export const label = {
    display: 'block',
    marginBottom: '8px',
    color: theme.palette.background.text,
    fontSize: '14px'
};

export const h1 = {
    display: 'block',
    marginBottom: '8px',
    textAlign: 'center',
    color: theme.palette.secondary.main,
    fontSize: '40px'
};


export const input = {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid "#ccc"',
    boxSizing: 'border-box',
    color: theme.palette.primary.dark,
    marginBottom: '10px'
};

export const button = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s'
};

export const buttonHover = {
    backgroundColor: '#0056b3'
};

export const error = {
    color: theme.palette.error.main,
    fontSize: '14px',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: theme.palette.error.light,
    borderRadius: '4px',
    maxWidth: '100%',
    textAlign: 'center', 
    display: 'flex',  
    justifyContent: 'center', 
    alignItems: 'center'  
};

export const succes = {
    color: theme.palette.success.main,
    fontSize: '14px',                
    marginTop: '10px',                
    marginBottom: '10px',             
    backgroundColor: theme.palette.success.light, 
    borderRadius: '4px',             
    maxWidth: '100%',                
    textAlign: 'center',              
    display: 'flex',                 
    justifyContent: 'center',         
    alignItems: 'center'            
};

export const link = {
    marginTop: '15px',
    fontSize: '14px'
};

export const footerStyle = {
    backgroundColor: theme.palette.background.dark,
    width: '100%',
    textAlign: 'center',
    fontSize: '15px',
    padding: '16px 0',
    marginTop: '15px'
};

export const imageStyle = {
    width: '100px',
    height: '100px'
};

export const headerStyle = {
    backgroundColor: theme.palette.primary.dark ,
    width: '100%'
};

export const buttonGroupStyle = {
    marginLeft: 'auto',
    padding: '5px 15px 5px 5px'
};


export const titleStyle = {
    fontSize: '20px',
    color: theme.palette.background.text, 
    marginBottom: '10px'
};

export const subtitleStyle = {
    fontSize: '18px',
    color: theme.palette.secondary.main
};


export const resultCardListStyle = {
    overflowY: 'auto',
    maxHeight: '600px',
    paddingRight: '10px',
    '&::-webkit-scrollbar': {
        width: '12px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '6px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.secondary.main} ${theme.palette.background.paper}`,
};

export const resultCommentListStyle = {
    overflowY: 'auto',
    maxHeight: '290px',
    paddingRight: '10px',
    '&::-webkit-scrollbar': {
        width: '12px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '6px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.secondary.main} ${theme.palette.background.paper}`,
};


