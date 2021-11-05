function AsideCard({ heading, children }) {
    return (
        <aside className="flex-1 p-8 shadow">
            <h5 className="font-bold text-xl hover:text-[#720f21] pb-[18px] mb-[18px] relative">
                {heading}
                <span className="bg-[#E5D8CE] absolute bottom-0 left-[14px] w-[11px] h-[5px] rounded"></span>
                <span className="bg-[#E5D8CE] absolute bottom-0 left-0 w-[11px] h-[5px] rounded"></span>
            </h5>
            <div>{children}</div>
        </aside>
    );
}

export default AsideCard;
