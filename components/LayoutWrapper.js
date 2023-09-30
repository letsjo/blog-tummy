import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Logo from '@/data/logo.svg';
import Link from './Link';
import Footer from './Footer';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';

const LayoutWrapper = ({ children }) => {
  return (
    <div className='relative flex h-screen flex-col justify-between'>
      <header className='fixed top-0 left-0 right-0 z-10 border-b-2 border-gray-100 bg-white bg-opacity-90 py-5 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-90 md:py-10'>
        <div className='mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-6 xl:max-w-5xl xl:px-0'>
          <div>
            <Link href='/' aria-label={siteMetadata.headerTitle}>
              <div className='flex items-center justify-center'>
                {/* <div className="w-8 h-8 mr-3">
                    <Logo />
                  </div> */}
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className='h-6 text-3xl font-semibold'>{siteMetadata.headerTitle}</div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className='flex items-center text-base leading-5'>
            <div className='hidden md:block'>
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className='p-1 font-medium text-gray-900 dark:text-gray-100 md:p-4'
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </header>

      <main className='h-auto'>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutWrapper;
