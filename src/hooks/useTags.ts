import { api } from "@/utils/api"
import { type tagType } from "@/utils/type"

const useTags = async () => {
    return await api.get(`tagsList/`).json<tagType[]>()
}

export default useTags;