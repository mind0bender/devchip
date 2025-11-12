import imageToBase64 from "@/lib/helpers/img2base64";
import { UserType } from "../../../../db/models/user";

export default async function generateProfileSVG({
  html_url,
  avatar_url,
  name,
  username,
  followers,
  total_repos,
  star_gazers_count,
  created_at,
  commit_count,
  contribution_count,
}: UserType): Promise<string> {
  const base64image: string = await imageToBase64(avatar_url);
  return `<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="800"
        height="334">
        <rect
          fill="#010409"
          width="100%"
          height="100%"
          stroke="#3d444d"
          rx="20"
          ry="20" />
        <g>
          <clipPath id="dp-clipper">
            <circle r="50" cx="80" cy="80" />
          </clipPath>
          <circle
            fill="transparent"
            stroke="#3d444d"
            stroke-width="1.5"
            r="50"
            cx="80"
            cy="80" />
          <a target="_blank" href="${html_url}">
            <image
              href="${base64image}"
              rx="100%"
              ry="100%"
              clip-path="url(#dp-clipper)"
              x="30"
              y="30"
              width="100"
              height="100" />
          </a>
        </g>
        <g transform="translate(150, 0)">
          <g transform="translate(0, 64)">
            <a target="_blank" href="${html_url}">
              <text
                font-family="monospace"
                font-weight="bold"
                font-size="32"
                fill="#eee">
                ${name}
              </text>
            </a>
          </g>
          <g>
            <a target="_blank" href="${html_url}">
              <g transform="translate(0, 80) scale(0.8)">
                <path
                  stroke-width="1.5"
                  stroke="#bbb"
                  d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              </g>
              <text
                font-family="monospace"
                font-weight="normal"
                x="30"
                y="96"
                font-size="16"
                fill="#bbb">
                @${username}
              </text>
            </a>
            <a
              target="_blank"
              href="${html_url}?tab=followers">
              <g transform="translate(0, 108) scale(0.8)">
                <path
                  stroke-width="1.5"
                  stroke="#bbb"
                  d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle stroke-width="1.5" stroke="#bbb" cx="9" cy="7" r="4" />
                <path
                  stroke-width="1.5"
                  stroke="#bbb"
                  d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path
                  stroke-width="1.5"
                  stroke="#bbb"
                  d="M16 3.13a4 4 0 0 1 0 7.75" />
              </g>
              <text
                font-family="monospace"
                font-weight="normal"
                x="30"
                y="124"
                font-size="14"
                fill="#bbb">
                ${followers} followers
              </text>
            </a>
          </g>
          <a
            target="_blank"
            href="${html_url}?tab=repositories">
            <g transform="translate(140, 108) scale(0.8)">
              <path stroke="#bbb" stroke-width="1.5" d="M10 2v8l3-3 3 3V2" />
              <path
                stroke="#bbb"
                stroke-width="1.5"
                d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
            </g>
            <text
              font-family="monospace"
              font-weight="normal"
              x="170"
              y="124"
              font-size="14"
              fill="#bbb">
              ${total_repos} repositories
            </text>
          </a>
        </g>
        <line x1="30" y1="160" x2="770" y2="160" stroke="#3d444d">
          <animate dur="1.2s" attributeName="x2" from="0" to="740" />
        </line>
        <g transform="translate(30, 190)" width="740" height="10">
          <g transform="translate(0,0)">
            <rect
              x="0"
              y="0"
              width="0"
              height="112"
              fill="#0d1117"
              rx="20"
              ry="20">
              <animate
                attributeName="width"
                from="0"
                to="225"
                dur="0.4s"
                begin="0s"
                fill="freeze" />
            </rect>
            <g>
              <text
                font-family="monospace"
                font-weight="normal"
                x="20"
                y="36"
                font-size="16"
                fill="#aaa">
                Total Stars
              </text>
              <g transform="translate(185, 20) scale(0.8)">
                <path
                  stroke="#e3b341"
                  stroke-width="2"
                  d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </g>
            </g>
            <text
              font-family="monospace"
              font-weight="bold"
              x="20"
              y="88"
              font-size="40"
              fill="#ccc">
              ${star_gazers_count}
            </text>
          </g>
          <g transform="translate(255,0)">
            <rect
              x="0"
              y="0"
              width="0"
              height="112"
              fill="#0d1117"
              rx="20"
              ry="20">
              <animate
                attributeName="width"
                from="0"
                to="225"
                dur="0.4s"
                begin="0.4s"
                fill="freeze" />
            </rect>
            <g>
              <text
                font-family="monospace"
                font-weight="normal"
                x="20"
                y="36"
                font-size="16"
                fill="#aaa">
                Total Commits
              </text>
              <g transform="translate(185, 20) scale(0.8)">
                <circle stroke-width="2" stroke="#7f7" cx="12" cy="12" r="3" />
                <line
                  stroke-width="2"
                  stroke="#7f7"
                  x1="3"
                  x2="9"
                  y1="12"
                  y2="12" />
                <line
                  stroke-width="2"
                  stroke="#7f7"
                  x1="15"
                  x2="21"
                  y1="12"
                  y2="12" />
              </g>
            </g>
            <text
              font-family="monospace"
              font-weight="bold"
              x="20"
              y="88"
              font-size="40"
              fill="#ccc">
              ${commit_count}
            </text>
          </g>
          <g transform="translate(510, 0)">
            <rect
              x="0"
              y="0"
              width="0"
              height="112"
              fill="#0d1117"
              rx="20"
              ry="20">
              <animate
                attributeName="width"
                from="0"
                to="225"
                dur="0.4s"
                begin="0.8s"
                fill="freeze" />
            </rect>
            <g>
              <text
                font-family="monospace"
                font-weight="normal"
                x="20"
                y="36"
                font-size="16"
                fill="#aaa">
                Contributions
              </text>
              <g transform="translate(185, 20) scale(0.8)">
                <path stroke-width="2" stroke="#77f" d="m18 16 4-4-4-4"></path>
                <path stroke-width="2" stroke="#77f" d="m6 8-4 4 4 4"></path>
                <path stroke-width="2" stroke="#77f" d="m14.5 4-5 16"></path>
              </g>
            </g>
            <text
              font-family="monospace"
              font-weight="bold450"
              x="20"
              y="88"
              font-size="40"
              fill="#ccc">
              ${contribution_count}
            </text>
          </g>
        </g>
      </svg>`;
}

export function generateUserDoesNotExist(username: string): string {
  return `<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="800"
            height="334">
            <rect
            fill="#010409"
            width="100%"
            height="100%"
            stroke="#3d444d"
            rx="20"
            ry="20" />
          <!-- Error Icon (A larger, more stylized 'X' within a circle) -->
          <circle cx="50" cy="60" r="35" fill="#c0392b" stroke="#e74c3c" stroke-width="4"/>
          <line x1="30" y1="40" x2="70" y2="80" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
          <line x1="70" y1="40" x2="30" y2="80" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
          
          <!-- Text Message -->
          <text
          x="105"
          y="75"
          font-family="Inter, sans-serif"
          font-size="36"
          fill="#ecf0f1"
          letter-spacing="1"
          >
          user ${username} does not exist
          </text>
          </svg>`;
}
