/* ==========================================================
   main.js
   Premium Glassmorphism UI
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Smooth Scroll
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {

            const id = link.getAttribute("href");

            if (id === "#") return;

            e.preventDefault();

            document.querySelector(id)?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });
    });

    /* ==========================
       Scroll Reveal
    ========================== */

    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: .15
    });

    reveals.forEach(item => revealObserver.observe(item));

    /* ==========================
       Active Navigation
    ========================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".floating-menu a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 160;

            if (scrollY >= top) {
                current = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    });

    /* ==========================
       Progress Bar
    ========================== */

    const progress = document.querySelector(".scroll-progress");

    function updateProgress() {

        if (!progress) return;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent = scrollY / height * 100;

        progress.style.width = percent + "%";

    }

    updateProgress();

    window.addEventListener("scroll", updateProgress);

    /* ==========================
       Back To Top
    ========================== */

    const topBtn = document.querySelector(".to-top");

    if (topBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }

        });

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    /* ==========================
       FAQ
    ========================== */

    document.querySelectorAll(".faq").forEach(item => {

        const button = item.querySelector(".faq-question");

        button?.addEventListener("click", () => {

            item.classList.toggle("active");

            const isOpen = item.classList.contains("active");
            button.setAttribute("aria-expanded", String(isOpen));

            const icon = item.querySelector(".faq-icon");
            if (icon) icon.textContent = isOpen ? "−" : "+";

        });

        button?.setAttribute("aria-expanded", "false");

    });

    /* ==========================
       Hero Parallax
    ========================== */

    const heroImage = document.querySelector(".banner-card");

    window.addEventListener("scroll", () => {

        if (!heroImage) return;

        const y = window.scrollY * .12;

        heroImage.style.transform =
            `translateY(${y}px) rotate(2deg)`;

    });

});

    /* ==========================
       Portfolio Slider
    ========================== */

    const mainImage = document.querySelector(".portfolio-main img");
    const thumbs = document.querySelectorAll(".thumb");
    const prevBtn = document.querySelector(".slide-btn.prev");
    const nextBtn = document.querySelector(".slide-btn.next");

    let currentIndex = 0;

    function showImage(index) {

        if (!mainImage || thumbs.length === 0) return;

        currentIndex = (index + thumbs.length) % thumbs.length;

        thumbs.forEach(item => item.classList.remove("active"));
        thumbs[currentIndex].classList.add("active");

        mainImage.src = thumbs[currentIndex].dataset.full || thumbs[currentIndex].src;
        mainImage.alt = thumbs[currentIndex].alt || "";
    }

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => showImage(index));
    });

    prevBtn?.addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    nextBtn?.addEventListener("click", () => {
        showImage(currentIndex + 1);
    });

    /* ==========================
       Lightbox
    ========================== */

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const lightboxClose = lightbox?.querySelector(".lightbox-close");

    mainImage?.addEventListener("click", () => {

        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = mainImage.src;
        lightbox.classList.add("active");

    });

    lightboxClose?.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    lightbox?.addEventListener("click", e => {

        if (e.target === lightbox) {
            lightbox.classList.remove("active");
        }

    });

    /* ==========================
       Keyboard Navigation
    ========================== */

    document.addEventListener("keydown", e => {

        if (e.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }

        if (e.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }

        if (e.key === "Escape") {
            lightbox?.classList.remove("active");
        }

    });

    /* ==========================
       Lazy Loading
    ========================== */

    document.querySelectorAll("img[data-src]").forEach(img => {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                img.src = img.dataset.src;
                observer.unobserve(img);

            });

        });

        observer.observe(img);

    });

    /* ==========================
       Initialize
    ========================== */

    if (thumbs.length > 0) {
        showImage(0);
    }

        /* ==========================
       Mobile Swipe
    ========================== */

    let touchStartX = 0;
    let touchEndX = 0;

    const portfolioMain = document.querySelector(".portfolio-main");

    portfolioMain?.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    portfolioMain?.addEventListener("touchend", (e) => {

        touchEndX = e.changedTouches[0].clientX;

        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) < 40) return;

        if (diff > 0) {
            showImage(currentIndex + 1);
        } else {
            showImage(currentIndex - 1);
        }

    }, { passive: true });

    /* ==========================
       Mouse Glow
    ========================== */

    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    window.addEventListener("mousemove", (e) => {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });

    /* ==========================
       Hero Scale
    ========================== */

    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {

        if (!hero) return;

        const value = Math.min(window.scrollY * 0.0004, 0.08);

        hero.style.transform = `scale(${1 - value})`;
        hero.style.opacity = `${1 - value * 2}`;

    }, { passive: true });

    /* ==========================
       Navbar Blur
    ========================== */

    const floatingMenu = document.querySelector(".floating-menu");

    window.addEventListener("scroll", () => {

        if (!floatingMenu) return;

        if (window.scrollY > 40) {
            floatingMenu.style.background = "rgba(15,22,38,.72)";
            floatingMenu.style.backdropFilter = "blur(40px)";
        } else {
            floatingMenu.style.background = "rgba(255,255,255,.08)";
            floatingMenu.style.backdropFilter = "blur(30px)";
        }

    }, { passive: true });

    /* ==========================
       Floating Animation
    ========================== */

    document.querySelectorAll(".banner-card,.package-card")
    .forEach((item, index) => {

        item.animate(
            [
                { transform: "translateY(0px)" },
                { transform: "translateY(-8px)" },
                { transform: "translateY(0px)" }
            ],
            {
                duration: 5000 + index * 500,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );

    });

    /* ==========
AUTO PORTFOLIO
========== */

const thumbsBox =
document.getElementById("portfolioThumbs");

if(thumbsBox){

for(let i=1;i<=20;i++){

const num =
String(i).padStart(2,"0");

const img =
new Image();

img.src=`portfolio/${num}.webp`;

img.className="thumb";

img.loading="lazy";

img.onerror=()=>{

img.remove();

}

img.onclick=()=>{

showImage(
i-1
);

}

thumbsBox.appendChild(img);

}

}

/* ==========================
   Avatar Pagination
========================== */

const avatarSection = document.getElementById("avatar");

if (avatarSection) {
    const avatarGrid = avatarSection.querySelector(".avatar-grid");
    const avatarCards = Array.from(avatarSection.querySelectorAll(".avatar-card"));
    const avatarPrev = avatarSection.querySelector(".avatar-page-prev");
    const avatarNext = avatarSection.querySelector(".avatar-page-next");
    const avatarPageButtons = avatarSection.querySelector(".avatar-page-buttons");
    const avatarStatus = avatarSection.querySelector(".avatar-page-status");
    const mobileQuery = window.matchMedia("(max-width: 680px)");
    let avatarPage = 0;

    avatarCards.forEach((card, index) => {
        card.tabIndex = 0;
        card.setAttribute("role", "group");
        card.setAttribute("aria-label", `${index + 1}번째 보유 아바타: ${card.querySelector("h3")?.innerText || "아바타"}`);
    });

    function avatarPageSize() {
        return mobileQuery.matches ? 2 : 8;
    }

    function showAvatarPage(page, options = {}) {
        const pageSize = avatarPageSize();
        const pageCount = Math.max(1, Math.ceil(avatarCards.length / pageSize));
        avatarPage = Math.min(Math.max(page, 0), pageCount - 1);
        const start = avatarPage * pageSize;
        const end = start + pageSize;

        avatarCards.forEach((card, index) => {
            const visible = index >= start && index < end;
            card.hidden = !visible;
            card.classList.toggle("avatar-page-enter", visible);
        });

        avatarPageButtons.replaceChildren();
        for (let index = 0; index < pageCount; index++) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = String(index + 1);
            button.setAttribute("aria-label", `${index + 1}페이지`);
            if (index === avatarPage) {
                button.classList.add("active");
                button.setAttribute("aria-current", "page");
            }
            button.addEventListener("click", () => showAvatarPage(index, { announce: true }));
            avatarPageButtons.appendChild(button);
        }

        avatarPrev.disabled = avatarPage === 0;
        avatarNext.disabled = avatarPage === pageCount - 1;
        avatarSection.querySelector(".avatar-pagination").hidden = pageCount <= 1;
        avatarStatus.textContent = `보유 아바타 ${avatarPage + 1}/${pageCount}페이지, ${start + 1}번부터 ${Math.min(end, avatarCards.length)}번까지 표시`;

        if (options.focus) {
            avatarCards[start]?.focus({ preventScroll: true });
        }
    }

    avatarPrev.addEventListener("click", () => showAvatarPage(avatarPage - 1, { announce: true, focus: true }));
    avatarNext.addEventListener("click", () => showAvatarPage(avatarPage + 1, { announce: true, focus: true }));

    avatarSection.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft" && avatarPage > 0) {
            event.preventDefault();
            showAvatarPage(avatarPage - 1, { announce: true, focus: true });
        }
        if (event.key === "ArrowRight" && avatarPage < Math.ceil(avatarCards.length / avatarPageSize()) - 1) {
            event.preventDefault();
            showAvatarPage(avatarPage + 1, { announce: true, focus: true });
        }
    });

    let avatarTouchStartX = 0;
    avatarGrid.addEventListener("touchstart", event => {
        avatarTouchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    avatarGrid.addEventListener("touchend", event => {
        const distance = avatarTouchStartX - event.changedTouches[0].clientX;
        if (Math.abs(distance) < 45) return;
        showAvatarPage(avatarPage + (distance > 0 ? 1 : -1), { announce: true });
    }, { passive: true });

    const resetAvatarPagination = () => showAvatarPage(0);
    mobileQuery.addEventListener?.("change", resetAvatarPagination);
    showAvatarPage(0);
}

/* ==========================
   Request estimator
========================== */
const estimateSection = document.getElementById("estimate");
if (estimateSection) {
    const packageInputs = [...estimateSection.querySelectorAll('input[name="estimatePackage"]')];
    const optionInputs = [...estimateSection.querySelectorAll('#estimateOptions input')];
    const nameInput = document.getElementById("requestName");
    const programInput = document.getElementById("requestProgram");
    const referenceInput = document.getElementById("requestReference");
    const memoInput = document.getElementById("requestMemo");
    const totalOutput = document.getElementById("estimateTotal");
    const summaryOutput = document.getElementById("estimateSummary");
    const copyButton = document.getElementById("estimateCopy");
    const resetButton = document.getElementById("estimateReset");
    let requestText = "";

    function updateEstimate() {
        const selectedPackage = packageInputs.find(input => input.checked) || packageInputs[0];
        const selectedOptions = optionInputs.filter(input => input.checked);
        const total = Number(selectedPackage.dataset.price) + selectedOptions.reduce((sum, input) => sum + Number(input.dataset.price), 0);
        const optionText = selectedOptions.length ? selectedOptions.map(input => input.value).join(", ") : "선택 없음";
        totalOutput.textContent = `${total.toLocaleString("ko-KR")}원`;
        summaryOutput.textContent = `패키지  ${selectedPackage.value}\n추가 옵션  ${optionText}`;
        requestText = `[커미션 견적 상담]\n닉네임: ${nameInput.value.trim() || "미입력"}\n패키지: ${selectedPackage.value}\n추가 옵션: ${optionText}\n사용 프로그램: ${programInput.value}\n자료 링크: ${referenceInput.value.trim() || "미입력"}\n요청사항: ${memoInput.value.trim() || "미입력"}\n예상 견적: ${total.toLocaleString("ko-KR")}원\n\n※ 자동 계산된 상담용 예상 금액이며 최종 견적은 자료 확인 후 확정됩니다.`;
    }

    async function copyRequest() {
        updateEstimate();
        try {
            await navigator.clipboard.writeText(requestText);
        } catch (error) {
            const helper = document.createElement("textarea");
            helper.value = requestText;
            helper.style.position = "fixed";
            helper.style.opacity = "0";
            document.body.appendChild(helper);
            helper.select();
            document.execCommand("copy");
            helper.remove();
        }
        copyButton.textContent = "복사되었어요 ✓";
        window.setTimeout(() => copyButton.textContent = "의뢰 내용 복사", 1800);
    }

    [...packageInputs, ...optionInputs, nameInput, programInput, referenceInput, memoInput].forEach(input => {
        input.addEventListener("input", updateEstimate);
        input.addEventListener("change", updateEstimate);
    });
    copyButton.addEventListener("click", copyRequest);
    resetButton.addEventListener("click", () => {
        packageInputs[0].checked = true;
        optionInputs.forEach(input => input.checked = false);
        nameInput.value = "";
        programInput.selectedIndex = 0;
        referenceInput.value = "";
        memoInput.value = "";
        updateEstimate();
    });
    updateEstimate();
}
