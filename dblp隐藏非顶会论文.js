// ==UserScript==
// @name         dblp 自动隐藏非顶会论文
// @namespace    ipid.me
// @version      0.1
// @description  自动隐藏非顶会论文
// @author       ipid
// @match        *://dblp.org/*
// @match        *://dblp.uni-trier.de/*
// @icon         https://dblp.org/img/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const HOVER_OPACITY = '0.6'
  const HIDE_OPACITY = '0.15'

  function shouldHide(li) {
    if (li.querySelector('span.title mark') === null) {
      return true
    }

    if (li.querySelector('.ccf-ranking') === null || li.querySelector('.ccf-rank') === null) {
      return false
    }
    if (li.querySelector('.ccf-a') !== null || li.querySelector('.ccf-b') !== null) {
      return false
    }

    return true
  }

  let lastHeight = NaN

  setInterval(() => {
    if (document.documentElement.offsetHeight === lastHeight) {
      return
    }

    const liArr = document.querySelectorAll('li.entry.toc')
    for (const li of liArr) {
      if (shouldHide(li)) {
        li.setAttribute('style', `opacity: ${HIDE_OPACITY} !important;`)
        li.addEventListener('mouseenter', () => {
          li.setAttribute('style', `opacity: ${HOVER_OPACITY} !important;`)
        })
        li.addEventListener('mouseleave', () => {
          li.setAttribute('style', `opacity: ${HIDE_OPACITY} !important;`)
        })
      }
    }

    lastHeight = document.documentElement.offsetHeight
  }, 1000)
})();