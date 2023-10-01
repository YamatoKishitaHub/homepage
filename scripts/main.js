'use strict';

{
  // ハンバーガーメニュー
  let open = document.querySelector('.header_hamburger_open');
  let overlay = document.querySelector('.overlay');
  let close = document.querySelector('.overlay_close');
  let main = document.querySelector('.main');
  let footer = document.querySelector('.footer');
  let links = document.querySelectorAll('.overlay a');

  open.addEventListener('click', () => {
    open.classList.add('hide');
    overlay.classList.add('show');
    main.classList.add('hide');
    footer.classList.add('hide');
  });

  close.addEventListener('click', () => {
    open.classList.remove('hide');
    overlay.classList.remove('show');
    main.classList.remove('hide');
    footer.classList.remove('hide');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      open.classList.remove('hide');
      overlay.classList.remove('show');
      main.classList.remove('hide');
      footer.classList.remove('hide');
    });
  })

  // 検索フォーム
  // let searchForm = document.querySelector('.header_search');
  // let searchFormInput = document.querySelector('.header_search_input');
  // let texts = document.querySelectorAll('.container_content_text');
  // let hitWords;

  // searchForm.addEventListener('submit', e => {
  //   e.preventDefault();
  //   search();
  // });

  // function search() {
  //   hitWords = document.querySelectorAll('.hit_word');
  //   hitWords.forEach(hitWord => {
  //     hitWord.outerHTML = hitWord.textContent;
  //   });

  //   let searchWord = searchFormInput.value;
  //   if (searchWord === '') {
  //     return;
  //   }
  //   setSearchWords(searchWord);

  //   texts.forEach(text => {
  //     if (text.innerHTML.indexOf(searchWord) !== -1) {
  //       text.innerHTML = text.innerHTML.replaceAll(searchWord, `<span class="hit_word" style="background-color: yellow;">${searchWord}</span>`);
  //     }
  //   });
  // }

  // function setSearchWords(searchWord) {
  //   if (!localStorage.getItem('search_words')) {
  //     let json = JSON.stringify([searchWord]);
  //     localStorage.setItem('search_words', json);
  //   } else {
  //     let searchWords = JSON.parse(localStorage.getItem('search_words'));
  //     let newSearchWords = searchWords;
  //     if (!searchWords.includes(searchWord)) {
  //       newSearchWords = searchWords.concat([searchWord]);
  //     }
  //     let json = JSON.stringify(newSearchWords);
  //     localStorage.setItem('search_words', json);
  //   }
  // }

  // searchFormInput.addEventListener('focus', getSearchWords);

  // function getSearchWords() {
  //   if (localStorage.getItem('search_words')) {
  //     let searchWords = JSON.parse(localStorage.getItem('search_words'));
  //     showHistory(searchWords);
  //   }
  // }

  // let searchDatalist = document.querySelector('.header_search_datalist');

  // function showHistory(searchWords) {
  //   searchDatalist.innerHTML = '';

  //   for (let i = 0; i < searchWords.length; i++) {
  //     let newOption = document.createElement('option');
  //     newOption.value = `${searchWords[i]}`;
  //     searchDatalist.appendChild(newOption);
  //   }
  // }

  // swiper
  let smallSwiper = new Swiper('.container_content_swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    effect: "coverflow",
    speed: 1000,
    slidesPerView: 1,
    keyboard: {
      enabled: true,
    },
  });

  // スライドショー共通
  function scrollAdjustmentParent() {
    setTimeout(() => {
      if (window.innerWidth > 1200) {
        window.scrollBy(0, -69);
      } else if (window.innerWidth > 660) {
        window.scrollBy(0, -100);
      } else {
        window.scrollBy(0, -70);
      }
    }, 10);
  }

  function scrollAdjustmentChild() {
    setTimeout(() => {
      if (window.innerWidth > 1200) {
        window.scrollBy(0, -110);
      } else if (window.innerWidth > 660) {
        window.scrollBy(0, -135);
      } else {
        window.scrollBy(0, -105);
      }
    }, 10);
  }

  // Profileスライドショー
  let profileContents = document.querySelectorAll('#profile .container_content');
  let profileShowNumber = 0;
  profileContents.forEach((profileContent, index) => {
    if (index !== profileShowNumber) {
      profileContent.style.display = 'none';
    }
  });

  let profilePrev = document.querySelector('#profile .container_thumbnail_prev');
  let profileNext = document.querySelector('#profile .container_thumbnail_next');

  function profileContentStyle() {
    profileContents.forEach((profileContent, index) => {
      profileContent.style.display = 'flex';
      if (index !== profileShowNumber) {
        profileContent.style.display = 'none';
      }
    });
  }

  function profileThumbnailStyle() {
    profileThumbnails.forEach((profileThumbnail, index) => {
      profileThumbnail.style.border = '2px solid black';
      profileThumbnail.style.opacity = '1';
      if (index !== profileShowNumber) {
        profileThumbnail.style.border = 'none';
        profileThumbnail.style.opacity = '0.5';
      }
    });
  }

  profilePrev.addEventListener('click', () => {
    profileShowNumber -= 1;
    if (profileShowNumber === -1) {
      profileShowNumber = profileContents.length - 1;
    }
    profileContentStyle();
    profileThumbnailStyle();
  });

  profileNext.addEventListener('click', () => {
    profileShowNumber += 1;
    if (profileShowNumber === profileContents.length) {
      profileShowNumber = 0;
    }
    profileContentStyle();
    profileThumbnailStyle();
  });

  let profileThumbnails = document.querySelectorAll('#profile .container_thumbnail_content');
  profileThumbnails.forEach((profileThumbnail, index) => {
    profileThumbnail.style.opacity = '0.5';
    if (index === profileShowNumber) {
      profileThumbnail.style.border = '2px solid black';
      profileThumbnail.style.opacity = '1';
    }
  });

  profileThumbnails.forEach((profileThumbnail, index) => {
    profileThumbnail.addEventListener('click', () => {
      profileShowNumber = index;
      profileContentStyle();
      profileThumbnailStyle();
    });
  });

  let profileNav = document.querySelector('.header_nav_parent_li_profile a');
  profileNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let profileNavLists = document.querySelectorAll('.header_nav_parent_li_profile .header_nav_child_li');
  profileNavLists.forEach((profileNavList, index) => {
    profileNavList.addEventListener('click', () => {
      profileShowNumber = index;
      profileContentStyle();
      profileThumbnailStyle();
      scrollAdjustmentChild();
    });
  });

  let profileOverlayNav = document.querySelector('.overlay_nav_parent_li_profile a');
  profileOverlayNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let profileOverlayNavLists = document.querySelectorAll('.overlay_nav_parent_li_profile .overlay_nav_child_li');
  profileOverlayNavLists.forEach((profileNavList, index) => {
    profileNavList.addEventListener('click', () => {
      profileShowNumber = index;
      profileContentStyle();
      profileThumbnailStyle();
      scrollAdjustmentChild();
    });
  });

  // Universityスライドショー
  let universityContents = document.querySelectorAll('#university .container_content');
  let universityShowNumber = 0;
  universityContents.forEach((universityContent, index) => {
    if (index !== universityShowNumber) {
      universityContent.style.display = 'none';
    }
  });

  let universityPrev = document.querySelector('#university .container_thumbnail_prev');
  let universityNext = document.querySelector('#university .container_thumbnail_next');

  function universityContentStyle() {
    universityContents.forEach((universityContent, index) => {
      universityContent.style.display = 'flex';
      if (index !== universityShowNumber) {
        universityContent.style.display = 'none';
      }
    });
  }

  function universityThumbnailStyle() {
    universityThumbnails.forEach((universityThumbnail, index) => {
      universityThumbnail.style.border = '2px solid black';
      universityThumbnail.style.opacity = '1';
      if (index !== universityShowNumber) {
        universityThumbnail.style.border = 'none';
        universityThumbnail.style.opacity = '0.5';
      }
    });
  }

  universityPrev.addEventListener('click', () => {
    universityShowNumber -= 1;
    if (universityShowNumber === -1) {
      universityShowNumber = universityContents.length - 1;
    }
    universityContentStyle();
    universityThumbnailStyle();
  });

  universityNext.addEventListener('click', () => {
    universityShowNumber += 1;
    if (universityShowNumber === universityContents.length) {
      universityShowNumber = 0;
    }
    universityContentStyle();
    universityThumbnailStyle();
  });

  let universityThumbnails = document.querySelectorAll('#university .container_thumbnail_content');
  universityThumbnails.forEach((universityThumbnail, index) => {
    universityThumbnail.style.opacity = '0.5';
    if (index === universityShowNumber) {
      universityThumbnail.style.border = '2px solid black';
      universityThumbnail.style.opacity = '1';
    }
  });

  universityThumbnails.forEach((universityThumbnail, index) => {
    universityThumbnail.addEventListener('click', () => {
      universityShowNumber = index;
      universityContentStyle();
      universityThumbnailStyle();
    });
  });

  let universityNav = document.querySelector('.header_nav_parent_li_university a');
  universityNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let universityNavLists = document.querySelectorAll('.header_nav_parent_li_university .header_nav_child_li');
  universityNavLists.forEach((universityNavList, index) => {
    universityNavList.addEventListener('click', () => {
      universityShowNumber = index;
      universityContentStyle();
      universityThumbnailStyle();
      scrollAdjustmentChild();
    });
  });

  let universityOverlayNav = document.querySelector('.overlay_nav_parent_li_university a');
  universityOverlayNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let universityOverlayNavLists = document.querySelectorAll('.overlay_nav_parent_li_university .overlay_nav_child_li');
  universityOverlayNavLists.forEach((universityNavList, index) => {
    universityNavList.addEventListener('click', () => {
      universityShowNumber = index;
      universityContentStyle();
      universityThumbnailStyle();
      scrollAdjustmentChild();
    });
  });

  // Skillスライドショー
  let skillContents = document.querySelectorAll('#skill .container_content');
  let skillShowNumber = 0;
  skillContents.forEach((skillContent, index) => {
    if (index !== skillShowNumber) {
      skillContent.style.display = 'none';
    }
  });

  let skillPrev = document.querySelector('#skill .container_thumbnail_prev');
  let skillNext = document.querySelector('#skill .container_thumbnail_next');

  function skillContentStyle() {
    skillContents.forEach((skillContent, index) => {
      skillContent.style.display = 'flex';
      if (index !== skillShowNumber) {
        skillContent.style.display = 'none';
      }
    });
  }

  function skillThumbnailStyle() {
    skillThumbnails.forEach((skillThumbnail, index) => {
      skillThumbnail.style.border = '2px solid black';
      skillThumbnail.style.opacity = '1';
      if (index !== skillShowNumber) {
        skillThumbnail.style.border = 'none';
        skillThumbnail.style.opacity = '0.5';
      }
    });
  }

  skillPrev.addEventListener('click', () => {
    skillShowNumber -= 1;
    if (skillShowNumber === -1) {
      skillShowNumber = skillContents.length - 1;
    }
    skillContentStyle();
    skillThumbnailStyle();
  });

  skillNext.addEventListener('click', () => {
    skillShowNumber += 1;
    if (skillShowNumber === skillContents.length) {
      skillShowNumber = 0;
    }
    skillContentStyle();
    skillThumbnailStyle();
  });

  let skillThumbnails = document.querySelectorAll('#skill .container_thumbnail_content');
  skillThumbnails.forEach((skillThumbnail, index) => {
    skillThumbnail.style.opacity = '0.5';
    if (index === skillShowNumber) {
      skillThumbnail.style.border = '2px solid black';
      skillThumbnail.style.opacity = '1';
    }
  });

  skillThumbnails.forEach((skillThumbnail, index) => {
    skillThumbnail.addEventListener('click', () => {
      skillShowNumber = index;
      skillContentStyle();
      skillThumbnailStyle();
    });
  });

  let skillNav = document.querySelector('.header_nav_parent_li_skill a');
  skillNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let skillNavLists = document.querySelectorAll('.header_nav_parent_li_skill .header_nav_child_li');
  skillNavLists.forEach((skillNavList, index) => {
    skillNavList.addEventListener('click', () => {
      skillShowNumber = index;
      skillContentStyle();
      skillThumbnailStyle();
      scrollAdjustmentChild();
    });
  });

  let skillOverlayNav = document.querySelector('.overlay_nav_parent_li_skill a');
  skillOverlayNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let skillOverlayNavLists = document.querySelectorAll('.overlay_nav_parent_li_skill .overlay_nav_child_li');
  skillOverlayNavLists.forEach((skillNavList, index) => {
    skillNavList.addEventListener('click', () => {
      skillShowNumber = index;
      skillContentStyle();
      skillThumbnailStyle();
      scrollAdjustmentChild();
    });
  });

  // Hobbyスライドショー
  let hobbyContents = document.querySelectorAll('#hobby .container_content');
  let hobbyShowNumber = 0;
  hobbyContents.forEach((hobbyContent, index) => {
    if (index !== hobbyShowNumber) {
      hobbyContent.style.display = 'none';
    }
  });

  let hobbyPrev = document.querySelector('#hobby .container_thumbnail_prev');
  let hobbyNext = document.querySelector('#hobby .container_thumbnail_next');

  function hobbyContentStyle() {
    hobbyContents.forEach((hobbyContent, index) => {
      hobbyContent.style.display = 'flex';
      if (index !== hobbyShowNumber) {
        hobbyContent.style.display = 'none';
      }
    });
  }

  function hobbyThumbnailStyle() {
    hobbyThumbnails.forEach((hobbyThumbnail, index) => {
      hobbyThumbnail.style.border = '2px solid black';
      hobbyThumbnail.style.opacity = '1';
      if (index !== hobbyShowNumber) {
        hobbyThumbnail.style.border = 'none';
        hobbyThumbnail.style.opacity = '0.5';
      }
    });
  }

  hobbyPrev.addEventListener('click', () => {
    hobbyShowNumber -= 1;
    if (hobbyShowNumber === -1) {
      hobbyShowNumber = hobbyContents.length - 1;
    }
    hobbyContentStyle();
    hobbyThumbnailStyle();
  });

  hobbyNext.addEventListener('click', () => {
    hobbyShowNumber += 1;
    if (hobbyShowNumber === hobbyContents.length) {
      hobbyShowNumber = 0;
    }
    hobbyContentStyle();
    hobbyThumbnailStyle();
  });

  let hobbyThumbnails = document.querySelectorAll('#hobby .container_thumbnail_content');
  hobbyThumbnails.forEach((hobbyThumbnail, index) => {
    hobbyThumbnail.style.opacity = '0.5';
    if (index === hobbyShowNumber) {
      hobbyThumbnail.style.border = '2px solid black';
      hobbyThumbnail.style.opacity = '1';
    }
  });

  hobbyThumbnails.forEach((hobbyThumbnail, index) => {
    hobbyThumbnail.addEventListener('click', () => {
      hobbyShowNumber = index;
      hobbyContentStyle();
      hobbyThumbnailStyle();
    });
  });

  let hobbyNav = document.querySelector('.header_nav_parent_li_hobby a');
  hobbyNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let hobbyNavLists = document.querySelectorAll('.header_nav_parent_li_hobby .header_nav_child_li');
  hobbyNavLists.forEach((hobbyNavList, index) => {
    hobbyNavList.addEventListener('click', () => {
      hobbyShowNumber = index;
      hobbyContentStyle();
      hobbyThumbnailStyle();
      scrollAdjustmentChild();
    });
  });

  let hobbyOverlayNav = document.querySelector('.overlay_nav_parent_li_hobby a');
  hobbyOverlayNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let hobbyOverlayNavLists = document.querySelectorAll('.overlay_nav_parent_li_hobby .overlay_nav_child_li');
  hobbyOverlayNavLists.forEach((hobbyNavList, index) => {
    hobbyNavList.addEventListener('click', () => {
      hobbyShowNumber = index;
      hobbyContentStyle();
      hobbyThumbnailStyle();
      scrollAdjustmentChild();
    });
  });

  // Valuesスライドショー
  let valuesContents = document.querySelectorAll('#values .container_content');
  let valuesShowNumber = 0;
  valuesContents.forEach((valuesContent, index) => {
    if (index !== valuesShowNumber) {
      valuesContent.style.display = 'none';
    }
  });

  let valuesPrev = document.querySelector('#values .container_thumbnail_prev');
  let valuesNext = document.querySelector('#values .container_thumbnail_next');

  function valuesContentStyle() {
    valuesContents.forEach((valuesContent, index) => {
      valuesContent.style.display = 'flex';
      if (index !== valuesShowNumber) {
        valuesContent.style.display = 'none';
      }
    });
  }

  function valuesThumbnailStyle() {
    valuesThumbnails.forEach((valuesThumbnail, index) => {
      valuesThumbnail.style.border = '2px solid black';
      valuesThumbnail.style.opacity = '1';
      if (index !== valuesShowNumber) {
        valuesThumbnail.style.border = 'none';
        valuesThumbnail.style.opacity = '0.5';
      }
    });
  }

  valuesPrev.addEventListener('click', () => {
    valuesShowNumber -= 1;
    if (valuesShowNumber === -1) {
      valuesShowNumber = valuesContents.length - 1;
    }
    valuesContentStyle();
    valuesThumbnailStyle();
  });

  valuesNext.addEventListener('click', () => {
    valuesShowNumber += 1;
    if (valuesShowNumber === valuesContents.length) {
      valuesShowNumber = 0;
    }
    valuesContentStyle();
    valuesThumbnailStyle();
  });

  let valuesThumbnails = document.querySelectorAll('#values .container_thumbnail_content');
  valuesThumbnails.forEach((valuesThumbnail, index) => {
    valuesThumbnail.style.opacity = '0.5';
    if (index === valuesShowNumber) {
      valuesThumbnail.style.border = '2px solid black';
      valuesThumbnail.style.opacity = '1';
    }
  });

  valuesThumbnails.forEach((valuesThumbnail, index) => {
    valuesThumbnail.addEventListener('click', () => {
      valuesShowNumber = index;
      valuesContentStyle();
      valuesThumbnailStyle();
    });
  });

  let valuesNav = document.querySelector('.header_nav_parent_li_values a');
  valuesNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let valuesNavLists = document.querySelectorAll('.header_nav_parent_li_values .header_nav_child_li');
  valuesNavLists.forEach((valuesNavList, index) => {
    valuesNavList.addEventListener('click', () => {
      valuesShowNumber = index;
      valuesContentStyle();
      valuesThumbnailStyle();
      scrollAdjustmentChild();
    });
  });

  let valuesOverlayNav = document.querySelector('.overlay_nav_parent_li_values a');
  valuesOverlayNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let valuesOverlayNavLists = document.querySelectorAll('.overlay_nav_parent_li_values .overlay_nav_child_li');
  valuesOverlayNavLists.forEach((valuesNavList, index) => {
    valuesNavList.addEventListener('click', () => {
      valuesShowNumber = index;
      valuesContentStyle();
      valuesThumbnailStyle();
      scrollAdjustmentChild();
    });
  });

  // 問い合わせフォーム
  let contactNav = document.querySelector('.header_nav_parent_li_contact a');
  contactNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let contactOverlayNav = document.querySelector('.overlay_nav_parent_li_contact a');
  contactOverlayNav.addEventListener('click', () => {
    scrollAdjustmentParent();
  });

  let contactFormError = document.getElementById('contact-form-error');
  let contactFormName = document.getElementById('contact-form-name').querySelector('input');
  let contactFormBelong = document.getElementById('contact-form-belong').querySelector('input');
  let contactFormEmail = document.getElementById('contact-form-email').querySelector('input');
  let contactFormMessage = document.getElementById('contact-form-message').querySelector('textarea');
  let contactFormEmailError = document.getElementById('contact-form-email-error');

  (function() {
    emailjs.init('mjUgyMXvHSA1J4da9');
  })();

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    if (checkContactForm() && checkSubmit()) {
      this.contact_number.value = Math.random() * 100000 | 0;
      emailjs.sendForm('service_qw51ccr', 'template_vn9niar', this)
        .then(function() {
          clearContactForm();
          window.alert('送信しました。');
        }, function(error) {
          window.alert('送信できませんでした。', error);
        });
    }
  });

  function checkContactForm() {
    if (contactFormName.value !== '' && contactFormBelong.value !== '' && contactFormEmail.value !== '' && contactFormMessage.value !== '') {
      contactFormError.classList.add('hide');
      if (checkEmail(contactFormEmail.value)) {
        return true;
      } else {
        return false;
      }
    } else {
      contactFormError.classList.remove('hide');
      return false;
    }
  }

  function checkSubmit() {
    return window.confirm('メールを送信してもよろしいですか？');
  }

  function clearContactForm() {
    contactFormName.value = '';
    contactFormBelong.value = '';
    contactFormEmail.value = '';
    contactFormMessage.value = '';
  }

  contactFormEmail.addEventListener('blur', () => {
    if (checkEmail(contactFormEmail.value)) {
      contactFormEmailError.classList.add('hide');
    } else {
      contactFormEmailError.classList.remove('hide');
    }
  });

  function checkEmail(email) {
    let regExp = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/);
    return regExp.test(email);
  }

  window.addEventListener('beforeunload', e => {
    if (contactFormName.value !== ''|| contactFormBelong.value !== '' || contactFormEmail.value !== '' || contactFormMessage.value !== '') {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  // Cookie
  let cookie = document.querySelector('.cookie');
  let cookieAgreeButton = document.querySelector('.cookie_button_agree');
  let cookieDisagreeButton = document.querySelector('.cookie_button_disagree');

  cookieAgreeButton.addEventListener('click', e => {
    e.preventDefault();
    deleteCookieForm();
    agreeCookie();
  });

  cookieDisagreeButton.addEventListener('click', e => {
    e.preventDefault();
    deleteCookieForm();
    disagreeCookie();
  });

  function deleteCookieForm() {
    cookie.style.display = 'none';
  }

  function agreeCookie() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date(), {
      'cookie_expires': 60 * 60 * 24
    });
    gtag('config', 'G-T29TK2N443', {
      'cookie_expires': 60 * 60 * 24
    });

    localStorage.setItem('cookie', 'agree');
    location.reload();
  }

  function disagreeCookie() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date(), {
      'cookie_expires': 0
    });
    gtag('config', 'G-T29TK2N443', {
      'cookie_expires': 0
    });

    localStorage.setItem('cookie', 'disagree');
    location.reload();
  }
  
  if (localStorage.getItem('cookie')) {
    deleteCookieForm();
  }

  // ページトップに戻るボタン
  let backTop = document.querySelector('.backtop');
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 300) {
      backTop.classList.remove('hide');
    } else {
      backTop.classList.add('hide');
    }
  });

  // コピーライト
  let baseYear = 2023;
  let now = new Date();
  let thisYear = now.getFullYear();
  let thisYearArea = document.querySelector('.this_year');
  let hyphen = document.querySelector('.hyphen');

  if (baseYear !== thisYear) {
    hyphen.innerHTML = ' - ';
    thisYearArea.innerHTML = thisYear;
  }
}