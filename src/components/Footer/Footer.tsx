import styles from './Footer.module.scss';

export const Footer = () => {
  const githubUrl = 'https://github.com/nastassja-dev';
  const linkedinUrl = 'https://linkedin.com/in/nastassja-dev';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>Developed by Nastassja Kamenskikh</p>
        <div className={styles.links}>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label="GitHub профиль"
            title="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61 3.4 3.4 0 0 1 .88-5.55 3.41 3.41 0 0 1 .9 5.55 3.37 3.37 0 0 0-.94 2.61v3.87"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label="LinkedIn профиль"
            title="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
