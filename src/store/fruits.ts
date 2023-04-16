import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import fruitsFromApi from "../api/fruits";
import { useStorage } from "@vueuse/core";
import { RouteLocationNormalized } from "vue-router";
import type { Nutritions, Fruits, MainFruitInfo } from "/@/types/model";
import { SortType, SortOrder, HeaderType } from "/@/types/enum";
import { useI18n } from "vue-i18n";

export const useFruitsStore = defineStore("fruitsStore", () => {
  const { t } = useI18n();

  const fruitsData = useStorage<Fruits[]>("fruits-from-api", fruitsFromApi);

  const search = ref<string>("");
  const checkedFamily = ref<string[]>([]);
  const title = ref(SortType.NAME);
  const sortOrder = ref(SortOrder.ASC);
  const dataType = ref(HeaderType.STRING);

  function setCheckedFamily(el: string[]) {
    checkedFamily.value = el;
  }

  function addAllToCompared() {
    fruitsData.value.forEach((el) => {
      el.isCompared = true;
    });
  }

  function setTitle(header: SortType) {
    title.value = header;
    sortOrder.value =
      sortOrder.value === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;

    dataType.value = Object.keys(fruitsData.value[0]).some(
      (el) => el === title.value.toLowerCase()
    )
      ? HeaderType.STRING
      : HeaderType.NUMBER;
  }

  function removeSelected(route: RouteLocationNormalized) {
    route.path === "/favorite"
      ? fruitsData.value.forEach((fruit) => (fruit.isFavorited = false))
      : fruitsData.value.forEach((fruit) => (fruit.isCompared = false));
  }

  function toggleFavorite(id: number) {
    let currentFruit = fruitsData.value.find((fruit) => fruit.id === id);
    if (currentFruit) {
      currentFruit.isFavorited = !currentFruit.isFavorited;
    }
  }
  function toggleCompare(id: number) {
    let currentFruit = fruitsData.value.find((fruit) => fruit.id === id);
    if (currentFruit) {
      currentFruit.isCompared = !currentFruit.isCompared;
    }
  }

  watch(title, () => {
    if (title) {
      sortOrder.value = SortOrder.ASC;
    }
  });

  const getFruitsByFamily = computed(() => {
    const filteredFruits = [...fruitsData.value];

    const family = filteredFruits.filter((item) => {
      return checkedFamily.value.includes(item.family);
    });

    return family;
  });

  const getSearchedFruit = computed(() => {
    return getFruitsByFamily.value.length === 0
      ? fruitsData.value.filter((el) =>
          t(`fruit-name.${el.name}`)
            .toLowerCase()
            .includes(search.value.toLowerCase())
        )
      : getFruitsByFamily.value.filter((el) =>
          t(`fruit-name.${el.name}`)
            .toLowerCase()
            .includes(search.value.toLowerCase())
        );
  });

  const getCompared = computed(() => {
    return getSearchedFruit.value.filter((fruit) => fruit.isCompared);
  });

  const sortedFruits = computed(() => {
    const mainTitle = title.value.toLowerCase() as keyof MainFruitInfo;
    const nutritionsTitle = title.value.toLowerCase() as keyof Nutritions;
    return getCompared.value?.sort((a, b) => {
      if (dataType.value === HeaderType.STRING) {
        return sortOrder.value === SortOrder.ASC
          ? a[mainTitle].localeCompare(b[mainTitle])
          : b[mainTitle].localeCompare(a[mainTitle]);
      }
      return sortOrder.value === SortOrder.ASC
        ? +a.nutritions[nutritionsTitle] - +b.nutritions[nutritionsTitle]
        : +b.nutritions[nutritionsTitle] - +a.nutritions[nutritionsTitle];
    });
  });

  const getFavorited = computed(() => {
    return getSearchedFruit.value.filter((fruit) => fruit.isFavorited);
  });

  const getFavoritedLength = computed(() => {
    return fruitsData.value.filter((el) => el.isFavorited === true).length;
  });

  const getComparedLength = computed(() => {
    return fruitsData.value.filter((el) => el.isCompared === true).length;
  });

  const getSortType = computed(() => {
    return {
      name: t("fruit.name"),
      family: t("fruit.family"),
      genus: t("fruit.genus"),
      order: t("fruit.order"),
      calories: t("fruit.calories"),
      carbohydrates: t("fruit.carbohydrates"),
      fat: t("fruit.fat"),
      protein: t("fruit.protein"),
      sugar: t("fruit.sugar"),
      actions: t("fruit.actions"),
    };
  });

  const getFamilyFilterList = computed(() => {
    return {
      musaceae: t("family.musaceae"),
      rutaceae: t("family.rutaceae"),
      rosaceae: t("family.rosaceae"),
      solanaceae: t("family.solanaceae"),
      bromeliaceae: t("family.bromeliaceae"),
      cucurbitaceae: t("family.cucurbitaceae"),
      anacardiaceae: t("family.anacardiaceae"),
      myrtaceae: t("family.myrtaceae"),
      caricaceae: t("family.caricaceae"),
      ebenaceae: t("family.ebenaceae"),
      malvaceae: t("family.malvaceae"),
      ericaceae: t("family.ericaceae"),
      actinidiaceae: t("family.actinidiaceae"),
      sapindaceae: t("family.sapindaceae"),
      moraceae: t("family.moraceae"),
      grossulariaceae: t("family.grossulariaceae"),
      passifloraceae: t("family.passifloraceae"),
      lythraceae: t("family.lythraceae"),
      cactaceae: t("family.cactaceae"),
      vitaceae: t("family.vitaceae"),
      lauraceae: t("family.lauraceae"),
    };
  });

  return {
    getSortType,
    title,
    sortOrder,
    search,
    getFruitsByFamily,
    checkedFamily,
    fruitsData,
    getFavorited,
    getComparedLength,
    getFavoritedLength,
    getCompared,
    getSearchedFruit,
    sortedFruits,
    dataType,
    getFamilyFilterList,
    removeSelected,
    toggleFavorite,
    toggleCompare,
    setCheckedFamily,
    setTitle,
    addAllToCompared,
  };
});
