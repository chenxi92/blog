module.exports = {
  base: '/blog/',
  lang: 'zh-CN',
  title: '陈希的学习笔记',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    navbar: [
      {
        text: 'Android',
        link: '/java/'
      },
      {
        text: 'iOS',
        link: '/iOS/'
      },
      {
        text: 'Shell',
        link: '/shell/'
      },
      {
        text: '数据结构',
        link: '/data-structure/'
      },
      {
        text: '数据库',
        link: '/database/'
      },
      {
        text: 'Vue',
        link: '/Vue/'
      },
      {
        text: '其他',
        link: '/others/'
      }
    ],
    repo: 'https://github.com/chenxi92/blog.git',
    lastUpdatedText: '上次更新时间',
    sidebar: {
      '/java/': [
        {
          text: 'Android',
          link: '/java/',
          children: [
            {
              text: 'Android reflection',
              link: '/java/reflection.md'
            },
            {
              text: 'Android FAQS',
              link: '/java/android-faqs.md'
            },
            {
              text: 'Android Thread Usage',
              link: '/java/android-thread-usage.md'
            }
          ]
        },
      ],
      '/iOS/': [
        {
          text: 'iOS',
          link: '/iOS/',
          children: [
            {
              text: 'Swift Concurrency',
              link: '/iOS/swift-concurrency.md'
            },
            {
              text: 'App 启动',
              link: '/iOS/app-launch.md'
            },
            {
              text: 'attribute',
              link: '/iOS/attribute.md'
            },
            {
              text: 'AutoLayout 布局',
              link: '/iOS/autolayout.md'
            },
            {
              text: 'Bug 追踪',
              link: '/iOS/bug-track.md'
            },
            {
              text: '创建开发证书',
              link: '/iOS/create-certificate.md'
            },
            {
              text: '信号量',
              link: '/iOS/dispatch-semaphore.md'
            },
            {
              text: 'iPA 文件安装',
              link: '/iOS/install-ipa-from-safari.md'
            },
            {
              text: 'isa 指针',
              link: '/iOS/isa.md'
            },
            {
              text: '钥匙串学习',
              link: '/iOS/keychain.md'
            },
            {
              text: 'libmobiledevice',
              link: '/iOS/libmobiledevice.md'
            },
            {
              text: '消息转发',
              link: '/iOS/method-forward.md'
            },
            {
              text: '多线程',
              link: '/iOS/multiple-thread.md'
            },
            {
              text: 'security',
              link: '/iOS/security.md'
            },
            {
              text: '符号表',
              link: '/iOS/symbols.md'
            },
            {
              text: 'iOS 开发小知识',
              link: '/iOS/tips.md'
            },
            {
              text: 'UIScrollView 约束',
              link: '/iOS/UIScrollview.md'
            },
            {
              text: 'iOS & Unity 相互调用',
              link: '/iOS/2-unity-ios-bridge.md'
            },
            {
              text: 'Vapor 学习',
              link: '/iOS/vapor-tutorial.md'
            },
            {
              text: 'Xcode 快捷键',
              link: '/iOS/xcode-shortcut.md'
            },
            {
              text: 'Configure Alternate App Icon',
              link: '/iOS/configure-alternate-app-icon.md'
            },
            {
              text: 'Sending Push Notifications',
              link: '/iOS/sending-push-notification.md'
            },
            {
              text: 'How to create dmg file',
              link: '/iOS/how-to-create-dmg.md'
            },
            {
              text: 'How to test static framework',
              link: '/iOS/how-to-test-static-framework/how-to-test-static-framework.md'
            },
            {
              text: 'Keywords',
              children: [
                {
                  text: 'dynamicCallable',
                  link: '/iOS/SwiftKeywords/dynamicCallable.md'
                }
              ]
            },
            {
              text: 'iOS App Pre-Order',
              link: '/iOS/ios-app-preorder.md'
            },
            {
              text: '面试',
              children: [
                {
                  text: '面试题',
                  link: '/iOS/interview/0-interview-question.md'
                },
                {
                  text: 'Category & Extension',
                  link: '/iOS/interview/1-category-and-extension.md'
                },
                {
                  text: '原子性',
                  link: '/iOS/interview/2-atomic.md'
                },
                {
                  text: 'Weak',
                  link: '/iOS/interview/3-weak.md'
                },
                {
                  text: '关联对象',
                  link: '/iOS/interview/4-associated-object.md'
                },
                {
                  text: '属性',
                  link: '/iOS/interview/property.md'
                }
              ]
            },
            {
              text: '源码学习',
              children: [
                {
                  text: 'AFNetworking',
                  link: '/iOS/open-analysis/AFNetworking.md'
                },
                {
                  text: 'Aspects',
                  link: '/iOS/open-analysis/Aspects.md'
                },
                {
                  text: 'Masonry',
                  link: '/iOS/open-analysis/Masonry.md'
                }
              ]
            }
          ]
        }
      ],
      '/shell/': [
        {
          text: 'Shell 学习',
          children: [
            {
              text: 'ag',
              link: '/shell/ag.md'
            },
            {
              text: 'awk',
              link: '/shell/awk.md'
            },
            {
              text: 'crontab',
              link: '/shell/crontab.md'
            },
            {
              text: 'curl',
              link: '/shell/curl.md'
            },
            {
              text: 'cut',
              link: '/shell/cut.md'
            },
            {
              text: 'du',
              link: '/shell/du.md'
            },
            {
              text: 'echo',
              link: '/shell/echo.md'
            },
            {
              text: 'find',
              link: '/shell/find.md'
            },
            {
              text: 'jq',
              link: '/shell/jq.md'
            },
            {
              text: 'nohup',
              link: '/shell/nohup.md'
            },
            {
              text: 'plutil',
              link: '/shell/plutil.md'
            },
            {
              text: 'scp',
              link: '/shell/scp.md'
            },
            {
              text: 'sed',
              link: '/shell/sed.md'
            },
            {
              text: 'sips',
              link: '/shell/sips.md'
            },
            {
              text: 'sort',
              link: '/shell/sort.md'
            },
            {
              text: 'string',
              link: '/shell/string.md'
            },
            {
              text: 'tar',
              link: '/shell/tar.md'
            },
            {
              text: 'tr',
              link: '/shell/tr.md'
            },
            {
              text: 'vim',
              link: '/shell/vim.md'
            },
            {
              text: 'xargs',
              link: '/shell/xargs.md'
            }
          ]
        }
      ],
      '/data-structure/': [
        {
          text: '数据结构学习',
          children: [
            {
              text: '加密算法总结',
              link: '/data-structure/iOS-Encrypt-summary.md'
            },
            {
              text: '异或运算',
              link: '/data-structure/xor.md'
            },
            {
              text: 'RC4',
              link: '/data-structure/RC4-C++&Python.md'
            },
            {
              text: '常见排序算法',
              link: '/data-structure/xor.md'
            }
          ]
        }
      ],
      '/database/': [
        {
          text: '数据库',
          children: [
            {
              text: 'Mongo',
              link: '/database/mongodb.md'
            },
            {
              text: 'MySQL',
              link: '/database/mysql.md'
            },
            {
              text: 'SQL',
              link: '/database/sql.md'
            }
          ]
        }
      ],
      '/Vue/': [
        {
          text: 'Vue',
          link: '/Vue/',
          children: [
            {
              text: 'Slots 用法总结',
              link: '/Vue/slots.md'
            }
          ]
        }
      ],
      '/others/': [
        {
          text: '其他',
          children: [
            {
              text: 'Graphviz Tutorial',
              link: '/others/graphviz-tutorial/graphviz-tutorial.md'
            },
            {
              text: 'Get WiFi password',
              link: '/others/wifi/wifi-password.md'
            },
            {
              text: 'Git',
              link: '/others/git.md'
            },
            {
              text: 'SVN',
              link: '/others/svn.md'
            },
            {
              text: 'laTex',
              link: '/others/laTex.md'
            }
          ]
        }
      ]
    }
  },
}
