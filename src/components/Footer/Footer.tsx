import styles from './Footer.module.scss';
import GithubIcon from '../../assets/github-icon.svg';
import LinkedinIcon from '../../assets/linkedin-icon.svg';

export const Footer = () => {
  const githubUrl = 'https://github.com/nastassja-dev';
  const linkedinUrl = 'https://www.linkedin.com/in/anastasiia-kamenskikh/';

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
            <img src={GithubIcon} className={styles.icon} alt="GitHub" />
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label="LinkedIn профиль"
            title="LinkedIn"
          >
            <img src={LinkedinIcon} className={styles.icon} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
};