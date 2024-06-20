import githubLogo from '../../assets/github-mark.svg'

export default function Footer() {
  return (
    <footer className="footer p-4 bg-base-300 text-base-content flex items-center justify-between">
      <div className="flex-grow"></div>
      <div className="text-center">
        <p>Copyright © 2024 - All rights reserved by griddic.com</p>
      </div>
      <div className="flex-grow flex justify-end">
        <a href="https://github.com/tobiasegelund/duck-playground">
          <img src={githubLogo} alt="Github Logo" className="h-8 w-8" />
        </a>
      </div>
    </footer>
  )
}
