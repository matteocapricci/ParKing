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
    backgroundColor: '#f8f8f8'
};
  
 export const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    backgroundColor: '#f8f8f8',
    flexDirection: 'column'
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
    maxWidth: '100%'
};

export const link = {
    marginTop: '15px',
    fontSize: '14px'
};

export const footerStyle = {
    backgroundColor: '#304269',
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