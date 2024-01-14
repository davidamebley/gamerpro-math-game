import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <p>&copy; {new Date().getFullYear()} GamerPro Math Game. All rights reserved.</p>
            <p>Visit: <a href="https://davidamebley.com" target="_blank" rel="noopener noreferrer" >www.davidamebley.com</a></p>
        </div>
    );
};

export default Footer;