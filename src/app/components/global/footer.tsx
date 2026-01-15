function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-25 bg-white/40 py-16 dark:bg-white/7">
      <div className="wrapper">
        <small className="text-xs">
          &copy; {currentYear} Luma &bull; All rights reserved &bull; Created by
          <span className="text-distinct"> Maciej Polowy</span>.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
