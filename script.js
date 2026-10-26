const year = document.querySelector("#current-year");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");
const themeToggle = document.querySelector(".theme-toggle");
const projectModal = document.querySelector(".project-modal");
const projectModalTitle = document.querySelector("#project-modal-title");
const projectModalDescription = document.querySelector("#project-modal-description");
const projectModalRole = document.querySelector("#project-modal-role");
const projectModalTechnologies = document.querySelector("#project-modal-technologies");
const projectModalAchievements = document.querySelector("#project-modal-achievements");
const modalCloseButton = document.querySelector(".modal-close");
const savedTheme = localStorage.getItem("portfolio-theme");
const projectDetails = {
  finance: {
    title: "모아 - 금융을 한눈에 모으다",
    description: "여러 금융 기관에 흩어진 자산과 지출을 한 화면에서 확인하고 관리할 수 있도록 설계한 개인 금융 대시보드입니다.",
    role: "사용자 리서치와 정보 구조 설계부터 대시보드 UX/UI, 프로토타입 제작까지 제품 경험 전반을 담당했습니다.",
    technologies: ["Figma", "사용자 인터뷰", "프로토타이핑"],
    achievements: ["흩어져 있던 자산·지출 정보를 한 화면에서 확인할 수 있는 통합 대시보드 구축", "주요 금융 정보를 쉽게 비교하고 필요한 관리 기능으로 이어지는 흐름 설계"]
  },
  mobility: {
    title: "온길 - 가까운 이동의 새로운 기준",
    description: "가까운 거리를 이동할 때 경로와 교통수단을 한눈에 비교하고 편리하게 선택할 수 있도록 설계한 모빌리티 서비스입니다.",
    role: "이동 여정의 문제를 정의하고 경로 탐색 구조, 지도 기반 화면, 주요 인터랙션 디자인을 담당했습니다.",
    technologies: ["Figma", "여정 지도", "인터랙션 프로토타입"],
    achievements: ["이동 옵션과 예상 소요 시간을 직관적으로 비교하는 경로 탐색 경험 구현", "목적지 검색부터 이동 경로 확인까지 이어지는 흐름 간소화"]
  },
  care: {
    title: "다온 - 돌봄을 더 다정하게",
    description: "환자와 보호자가 진료 일정과 건강 정보를 함께 확인하고 일상적인 돌봄을 이어갈 수 있도록 설계한 비대면 헬스케어 서비스입니다.",
    role: "환자와 보호자의 돌봄 여정을 살펴보고 정보 공유 구조, 주요 사용자 흐름, 모바일 UX/UI를 설계했습니다.",
    technologies: ["Figma", "사용자 인터뷰", "모바일 UX/UI"],
    achievements: ["진료 일정과 건강 정보를 환자·보호자가 함께 확인할 수 있는 공유 경험 구축", "돌봄에 필요한 정보를 쉽게 찾고 확인할 수 있도록 모바일 화면 구조 개선"]
  }
};
let projectModalOpener = null;

const setTheme = (theme) => {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "라이트모드 켜기" : "다크모드 켜기");
  }
};

setTheme(savedTheme === "dark" ? "dark" : "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

const globeObject = document.querySelector(".globe-map");

// 전체 세계 지도를 구면에 투영해 지구본을 360도 회전시킵니다.
const startGlobeRotation = () => {
  const svg = globeObject.contentDocument;
  const gridGroup = svg?.querySelector("#globe-grid");
  const landGroup = svg?.querySelector("#globe-land");
  if (!gridGroup || !landGroup || !landGroup.querySelector("path")) {
    console.error("지구본 지도를 불러오지 못했습니다.");
    return;
  }

  const gridBackGroup = gridGroup.cloneNode(false);
  const landBackGroup = landGroup.cloneNode(false);
  gridBackGroup.id = "globe-grid-back";
  landBackGroup.id = "globe-land-back";
  gridBackGroup.setAttribute("stroke-opacity", ".24");
  landBackGroup.setAttribute("stroke-opacity", ".24");
  svg.documentElement.insertBefore(gridBackGroup, gridGroup);
  svg.documentElement.insertBefore(landBackGroup, gridGroup);

  const radius = 186;
  const markerGroup = svg.createElementNS("http://www.w3.org/2000/svg", "g");
  markerGroup.setAttribute("id", "seoul-marker");
  markerGroup.setAttribute("visibility", "hidden");
  markerGroup.setAttribute("font-family", "Arial, sans-serif");
  markerGroup.setAttribute("font-size", "10");
  markerGroup.setAttribute("font-weight", "700");
  const markerHalo = svg.createElementNS("http://www.w3.org/2000/svg", "circle");
  markerHalo.setAttribute("r", "6");
  markerHalo.setAttribute("fill", "#24aee4");
  markerHalo.setAttribute("fill-opacity", ".24");
  const markerDot = svg.createElementNS("http://www.w3.org/2000/svg", "circle");
  markerDot.setAttribute("r", "3.2");
  markerDot.setAttribute("fill", "#24aee4");
  markerDot.setAttribute("stroke", "#ffffff");
  markerDot.setAttribute("stroke-width", "1.2");
  const markerLabel = svg.createElementNS("http://www.w3.org/2000/svg", "text");
  markerLabel.textContent = "I'm here!";
  markerLabel.setAttribute("x", "8");
  markerLabel.setAttribute("y", "-6");
  markerLabel.setAttribute("fill", "#159bd0");
  markerGroup.append(markerHalo, markerDot, markerLabel);
  svg.documentElement.append(markerGroup);

  const seoul = {
    longitude: 126.978 * Math.PI / 180,
    latitude: 37.5665 * Math.PI / 180
  };
  const worldPaths = [...landGroup.querySelectorAll("path")];

  for (let longitude = -180; longitude < 180; longitude += 15) {
    const path = svg.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M${longitude},90${Array.from({ length: 73 }, (_, index) => `L${longitude},${90 - index * 2.5}`).join("")}`);
    gridGroup.append(path);
  }

  for (let latitude = -75; latitude <= 75; latitude += 15) {
    const path = svg.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M-180,${-latitude}${Array.from({ length: 144 }, (_, index) => `L${-180 + (index + 1) * 2.5},${-latitude}`).join("")}`);
    gridGroup.append(path);
  }

  const createSample = (path, backGroup) => {
    const backPath = path.cloneNode(false);
    backGroup.append(backPath);
    const totalLength = path.getTotalLength();
    const points = [];
    for (let length = 0; length < totalLength; length += 1.5) {
      const point = path.getPointAtLength(length);
      points.push({ longitude: point.x * Math.PI / 180, latitude: -point.y * Math.PI / 180 });
    }
    const lastPoint = path.getPointAtLength(totalLength);
    points.push({ longitude: lastPoint.x * Math.PI / 180, latitude: -lastPoint.y * Math.PI / 180 });
    return { path, backPath, points };
  };
  const samples = [
    ...[...gridGroup.querySelectorAll("path")].map((path) => createSample(path, gridBackGroup)),
    ...worldPaths.map((path) => createSample(path, landBackGroup))
  ];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const startingLongitude = seoul.longitude;
  const rotationDuration = 40000;
  const rotationStart = performance.now();
  let animationFrame = 0;
  let lastRender = 0;
  const projectPoint = (point, angle) => {
    const longitude = point.longitude - startingLongitude - angle;
    return {
      x: 200 + radius * Math.cos(point.latitude) * Math.sin(longitude),
      y: 200 - radius * Math.sin(point.latitude),
      z: Math.cos(point.latitude) * Math.cos(longitude)
    };
  };

  const renderGlobe = (time) => {
    const angle = ((time - rotationStart) % rotationDuration) / rotationDuration * Math.PI * 2;

    samples.forEach(({ path, backPath, points }) => {
      let frontPathData = "";
      let backPathData = "";
      let previous = null;
      const findHorizonPoint = (start, end) => {
        let low = start;
        let high = end;
        for (let step = 0; step < 8; step += 1) {
          const middle = {
            longitude: (low.longitude + high.longitude) / 2,
            latitude: (low.latitude + high.latitude) / 2
          };
          if (projectPoint(middle, angle).z > 0) {
            low = middle;
          } else {
            high = middle;
          }
        }
        return projectPoint(projectPoint(low, angle).z > 0 ? low : high, angle);
      };
      const appendPoint = (pathData, command, point) =>
        `${pathData}${command}${point.x.toFixed(1)},${point.y.toFixed(1)}`;

      points.forEach((point) => {
        const projected = projectPoint(point, angle);
        const isFront = projected.z > 0;
        if (previous) {
          const wasFront = previous.projected.z > 0;
          if (isFront !== wasFront) {
            const horizon = findHorizonPoint(previous.point, point);
            if (wasFront) {
              frontPathData = appendPoint(frontPathData, "L", horizon);
              backPathData = appendPoint(backPathData, "M", horizon);
            } else {
              backPathData = appendPoint(backPathData, "L", horizon);
              frontPathData = appendPoint(frontPathData, "M", horizon);
            }
          }
          if (isFront) {
            frontPathData = appendPoint(frontPathData, "L", projected);
          } else {
            backPathData = appendPoint(backPathData, "L", projected);
          }
        } else if (isFront) {
          frontPathData = appendPoint(frontPathData, "M", projected);
        } else {
          backPathData = appendPoint(backPathData, "M", projected);
        }

        previous = { point, projected };
      });
      path.setAttribute("d", frontPathData);
      backPath.setAttribute("d", backPathData);
    });
    const projectedSeoul = projectPoint(seoul, angle);
    markerGroup.setAttribute("visibility", projectedSeoul.z > 0 ? "visible" : "hidden");
    markerGroup.setAttribute("transform", `translate(${projectedSeoul.x.toFixed(1)} ${projectedSeoul.y.toFixed(1)})`);
    lastRender = time;
  };

  const animateGlobe = (time) => {
    if (time - lastRender >= 33) {
      renderGlobe(time);
    }
    animationFrame = window.requestAnimationFrame(animateGlobe);
  };

  const updateGlobeMotion = () => {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    renderGlobe(performance.now());
    if (!reducedMotion.matches) {
      animationFrame = window.requestAnimationFrame(animateGlobe);
    }
  };

  reducedMotion.addEventListener("change", updateGlobeMotion);
  updateGlobeMotion();
};

if (globeObject) {
  if (globeObject.contentDocument?.querySelector("#globe-land")) {
    startGlobeRotation();
  } else {
    globeObject.addEventListener("load", startGlobeRotation, { once: true });
  }
}

// 프로젝트 정보를 모달에 채우고 브라우저의 접근성 있는 dialog를 엽니다.
const openProjectDetails = (projectId, opener) => {
  const project = projectDetails[projectId];
  if (!project || !projectModal || !projectModalTitle || !projectModalDescription ||
      !projectModalRole || !projectModalTechnologies || !projectModalAchievements) {
    console.error(`프로젝트 상세 정보를 표시할 수 없습니다: ${projectId}`);
    return;
  }

  projectModalOpener = opener;
  projectModalTitle.textContent = project.title;
  projectModalDescription.textContent = project.description;
  projectModalRole.textContent = project.role;
  projectModalTechnologies.replaceChildren(...project.technologies.map((technology) => {
    const item = document.createElement("li");
    item.textContent = technology;
    return item;
  }));
  projectModalAchievements.replaceChildren(...project.achievements.map((achievement) => {
    const item = document.createElement("li");
    item.textContent = achievement;
    return item;
  }));
  projectModal.showModal();
};

// 카드 클릭과 Enter/Space 키 입력으로 상세 모달을 엽니다.
document.querySelectorAll(".project-card[data-project]").forEach((card) => {
  card.addEventListener("click", () => {
    openProjectDetails(card.dataset.project, card);
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectDetails(card.dataset.project, card);
    }
  });
});

if (projectModal && modalCloseButton) {
  modalCloseButton.addEventListener("click", () => projectModal.close());
  projectModal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      projectModal.close();
    }
  });
  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      projectModal.close();
    }
  });
  projectModal.addEventListener("close", () => {
    projectModalOpener?.focus();
    projectModalOpener = null;
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = new FormData(contactForm).get("name");
    formStatus.textContent = `${name}님, 메시지를 확인했습니다. 곧 답변드릴게요!`;
    contactForm.reset();
  });
}
