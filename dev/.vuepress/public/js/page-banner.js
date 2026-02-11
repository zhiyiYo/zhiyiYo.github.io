(function() {
  const BANNER_CLOSED_KEY = 'page-banner-closed';

  function getBannerConfig() {
    const path = window.location.pathname;
    const zhBanner = {
      text: '代码也要焕新颜，组件库年货节狂欢开启，快来看看吧 🎉',
      link: '/zh/price',
      linkText: '了解更多'
    };

    const enBanner = {
      text: 'Year-End Sale — Big Savings, Don’t Miss Out! 🎉 🎉',
      link: '/price',
      linkText: 'Learn more'
    };

    return path.startsWith('/zh/') ? zhBanner : enBanner;
  }

  function isBannerClosed() {
    return localStorage.getItem(BANNER_CLOSED_KEY) === 'true';
  }

  function closeBanner() {
    localStorage.setItem(BANNER_CLOSED_KEY, 'true');
    const bannerContainer = document.getElementById('page-banner-container');
    if (bannerContainer) {
      const toast = bannerContainer.querySelector('.page-banner-toast');
      if (toast) {
        // 添加淡出动画
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-20px) scale(0.95)';
        setTimeout(() => {
          bannerContainer.remove();
        }, 300);
      } else {
        bannerContainer.remove();
      }
    }
  }



  function checkAndInjectBanner() {
    // 如果用户已经关闭过横幅，不再显示
    if (isBannerClosed()) {
      return;
    }

    const path = window.location.pathname;
    console.log('Checking path:', path);

    if (path.includes('/pages')) {
      let bannerContainer = document.getElementById('page-banner-container');

      if (!bannerContainer) {
        // 创建横幅容器
        bannerContainer = document.createElement('div');
        bannerContainer.id = 'page-banner-container';
        document.body.appendChild(bannerContainer);

        // 获取配置
        const config = getBannerConfig();
        const locale = path.startsWith('/zh/') ? 'zh' : 'en';

        // // 确保链接按钮能显示 - 如果配置中没有 link，使用默认值
        // if (!config.link || config.link.trim() === '') {
        //   console.warn('No link in config, using default');
        //   config.link = locale === 'zh' ? 'https://qfluentwidgets.com/zh/price' : 'https://qfluentwidgets.com/price';
        //   config.linkText = config.linkText || (locale === 'zh' ? '了解更多' : 'Learn more');
        // }

        // 创建横幅 HTML（纯色背景，带跳转箭头）
        bannerContainer.innerHTML = `
          <div class="page-banner-toast" style="
            position: fixed;
            top: 1.5rem;
            left: 50%;
            transform: translateX(-50%) translateY(-30px) scale(0.95);
            max-width: 36rem;
            width: calc(100% - 2rem);
            padding: 0.5rem 1.25rem;
            background-color: rgb(220, 252, 231);
            border: 1px solid rgba(167, 243, 208, 0.5);
            border-radius: 0.75rem;
            box-shadow:
              0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04),
              0 0 0 1px rgba(0, 0, 0, 0.05);
            z-index: 1000;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            backdrop-filter: blur(10px);
          ">
            <div style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 1rem;
            ">
              <div style="
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex: 1;
                min-width: 0;
              ">
                <div style="
                  width: 0.375rem;
                  height: 0.375rem;
                  border-radius: 50%;
                  background-color: rgb(16, 185, 129);
                  flex-shrink: 0;
                  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
                "></div>
                <span style="
                  font-size: 0.875rem;
                  color: rgb(5, 46, 22);
                  font-weight: 500;
                  line-height: 1.6;
                  letter-spacing: -0.01em;
                ">${config.text}</span>
              </div>
              <div style="
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex-shrink: 0;
              ">
                ${config.link && config.link.trim() !== '' ? `
                <a href="${config.link}" id="page-banner-link" style="
                  display: flex;
                  align-items: center;
                  gap: 0.375rem;
                  padding: 0.375rem 0.625rem;
                  background: rgba(16, 185, 129, 0.1);
                  border: none;
                  border-radius: 0.375rem;
                  color: rgb(5, 46, 22);
                  text-decoration: none;
                  font-size: 0.8125rem;
                  font-weight: 500;
                  transition: all 0.2s ease;
                  white-space: nowrap;
                " onmouseover="this.style.backgroundColor='rgba(16, 185, 129, 0.2)'; this.style.transform='translateX(2px)'" onmouseout="this.style.backgroundColor='rgba(16, 185, 129, 0.1)'; this.style.transform='translateX(0)'">
                  <span>${config.linkText || (locale === 'zh' ? '了解更多' : 'Learn more')}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 3h6v6M3 11l8-8"></path>
                  </svg>
                </a>
                ` : ''}
                <button id="page-banner-close-btn" style="
                  background: rgba(0, 0, 0, 0.03);
                  border: none;
                  cursor: pointer;
                  padding: 0.375rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: rgb(5, 46, 22);
                  opacity: 0.6;
                  transition: all 0.2s ease;
                  border-radius: 0.375rem;
                  flex-shrink: 0;
                  width: 1.75rem;
                  height: 1.75rem;
                " onmouseover="this.style.opacity='1'; this.style.backgroundColor='rgba(0,0,0,0.08)'; this.style.transform='scale(1.1)'" onmouseout="this.style.opacity='0.6'; this.style.backgroundColor='rgba(0,0,0,0.03)'; this.style.transform='scale(1)'" title="${locale === 'zh' ? '关闭' : 'Close'}">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 4L4 10M4 4l6 6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `;

        // 添加关闭按钮事件
        const closeBtn = document.getElementById('page-banner-close-btn');
        if (closeBtn) {
          closeBtn.addEventListener('click', closeBanner);
        }

        // 添加样式（包括暗色主题支持）
        let styleElement = document.getElementById('page-banner-styles');
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = 'page-banner-styles';
          styleElement.textContent = `
            .page-banner-toast {
              animation: toastSlideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            @keyframes toastSlideDown {
              from {
                opacity: 0;
                transform: translateX(-50%) translateY(-30px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateX(-50%) translateY(0) scale(1);
              }
            }
            html.dark .page-banner-toast {
              background-color: rgb(6, 95, 70) !important;
              border-color: rgba(5, 150, 105, 0.3) !important;
              box-shadow:
                0 20px 25px -5px rgba(0, 0, 0, 0.3),
                0 10px 10px -5px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.05) !important;
            }
            html.dark .page-banner-toast span {
              color: rgb(209, 250, 229) !important;
            }
            html.dark .page-banner-toast .page-banner-indicator {
              background-color: rgb(16, 185, 129) !important;
              box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3) !important;
            }
            html.dark #page-banner-link {
              background: rgba(16, 185, 129, 0.2) !important;
              color: rgb(209, 250, 229) !important;
            }
            html.dark #page-banner-link:hover {
              background: rgba(16, 185, 129, 0.3) !important;
            }
            #page-banner-link:hover {
              background-color: rgba(16, 185, 129, 0.2) !important;
            }
            html.dark #page-banner-close-btn {
              background: rgba(255, 255, 255, 0.08) !important;
              color: rgb(209, 250, 229) !important;
            }
            html.dark #page-banner-close-btn:hover {
              background: rgba(255, 255, 255, 0.15) !important;
            }
            #page-banner-close-btn:active {
              transform: scale(0.95) !important;
            }
            @media (max-width: 640px) {
              .page-banner-toast {
                max-width: calc(100% - 1.5rem) !important;
                width: calc(100% - 1.5rem) !important;
                padding: 0.875rem 1rem !important;
                top: 1rem !important;
              }
              .page-banner-toast span {
                font-size: 0.8125rem !important;
              }
              #page-banner-link span {
                display: none;
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .page-banner-toast,
              .page-banner-toast * {
                animation: none !important;
                transition: none !important;
              }
            }
          `;
          document.head.appendChild(styleElement);
        }

        // 触发动画
        setTimeout(() => {
          const toast = bannerContainer.querySelector('.page-banner-toast');
          if (toast) {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0) scale(1)';
          }
        }, 10);

        console.log('PageBanner toast injected at path:', path);
      }
    } else {
      // 移除横幅
      const bannerContainer = document.getElementById('page-banner-container');
      if (bannerContainer) {
        bannerContainer.remove();
        console.log('PageBanner removed at path:', path);
      }
    }
  }

  // 等待配置加载
  function waitForConfig() {
    checkAndInjectBanner();
  }

  // 初始检查
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForConfig);
  } else {
    waitForConfig();
  }

  // 监听路由变化（VuePress 使用 history API）
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      setTimeout(checkAndInjectBanner, 100);
    }
  }, 100);
})();