  import CommodityDetail from "@/components/CommodityDetail";
import { getCommodityData } from "@/lib/actions";

type Props = {
  params: { id: string };
};

const CommodityDetailPage = async ({ params: { id } }: Props) => {

  const commoditydata = await getCommodityData(id);

  return (
    <section>
      <CommodityDetail data={commoditydata} id={id}/>
    </section> 
  );
};
export default CommodityDetailPage;
