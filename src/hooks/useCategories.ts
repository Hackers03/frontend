import { api } from "@/utils/api"
import { type categoryType } from "@/utils/type"

const useCategories = async () => {
    return await api.get(`CategoriesList/`).json<categoryType[]>()
}

export default useCategories;