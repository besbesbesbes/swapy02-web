import { BiSolidMessageAdd } from "react-icons/bi";
import React, { useEffect, useRef, useState } from 'react';
import ShowOffer from "./ShowOffer";

export default function OfferMessage() {
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, []);
    const [ctrlShowOffer, setCtrlShowOffer] = useState({ visibility: "invisible", opacity: 0 })
    const hdlShowOffer = () => {
        setCtrlShowOffer({ visibility: 'visible', opacity: 100 })
    }
    return (
        <div className="flex flex-col gap-5">
            <div className='bg-my-bg-card w-full shadow-md p-2 flex flex-col gap-2'>
                {/* message area */}
                <div className="border w-full h-[350px] overflow-y-scroll text-my-prim bg-my-hover">
                    <div className='p-5 flex flex-col gap-2 justify-end bg-my-hover'>
                        <div className="w-fit flex items-end gap-1 self-end">
                            <p className="text-my-prim text-xs">14-9 10:12am</p>
                            <p className="bg-my-bg-card border border-my-acct py-1 px-2 rounded-xl w-fit shadow-md">Offeror create new offer "#1234". <span className="font-bold italic">[Auto]</span></p>
                        </div>
                        <div className="w-fit flex items-end gap-1">
                            <p className="bg-my-bg-card border border-my-prim py-1 px-2 rounded-xl w-fit shadow-md">Can you add more assets? I think just Eggs and Dog Food is not enough.</p>
                            <p className="text-my-prim text-xs">14-9 10:20am</p>
                        </div>
                        <div className="w-fit flex items-end gap-1 self-end">
                            <p className="text-my-prim text-xs">14-9 10:25am</p>
                            <p className="bg-my-bg-card border border-my-acct py-1 px-2 rounded-xl w-fit shadow-md">Sure my friend.</p>
                        </div>
                        <div className="w-fit flex items-end gap-1 self-end">
                            <p className="text-my-prim text-xs">14-9 10:26am</p>
                            <p className="bg-my-bg-card border border-my-acct py-1 px-2 rounded-xl w-fit shadow-md">Offeror update offer asset. <span className="font-bold italic">[Auto]</span></p>
                        </div>
                        <div className="w-fit flex items-end gap-1">
                            <p className="bg-my-bg-card border border-my-prim py-1 px-2 rounded-xl w-fit shadow-md">Swaper has accepted offer. <span className="font-bold italic">[Auto]</span></p>
                            <p className="text-my-prim text-xs">14-9 10:30am</p>
                        </div>
                        <div className="w-fit flex items-end gap-1">
                            <p className="bg-my-bg-card border border-my-prim py-1 px-2 rounded-xl w-fit shadow-md">I will ship on this friday.</p>
                            <p className="text-my-prim text-xs">14-9 10:30am</p>
                        </div>
                        <div className="w-fit flex items-end gap-1 self-end">
                            <p className="text-my-prim text-xs">14-9 10:45am</p>
                            <p className="bg-my-bg-card border border-my-acct py-1 px-2 rounded-xl w-fit shadow-md">No problem, i will ship it today.</p>
                        </div>
                        {/* <div className="w-fit flex items-end gap-1 self-end">
                            <p className="text-my-prim text-xs">14-9 10:45am</p>
                            <p className="bg-my-bg-card border border-my-acct py-1 px-2 rounded-xl w-fit shadow-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, fuga adipisci. Veniam molestiae, iusto laborum earum necessitatibus deleniti atque, perspiciatis odit natus eligendi, modi minus voluptatibus harum? Placeat fuga aliquid ipsam quo quidem exercitationem omnis voluptatem delectus beatae minima, commodi aut nulla dolorum fugit obcaecati necessitatibus error nisi, vero ipsum facere! Veniam laudantium incidunt facere repellat sunt nemo fugit cupiditate at accusantium dolor, impedit ad esse quaerat minima illum dolorum maiores quia sint mollitia ullam voluptatem sapiente. Consectetur alias nihil nisi exercitationem similique, amet voluptas nemo aliquam atque ut sit, labore at mollitia iure cumque placeat vitae totam beatae reprehenderit accusantium quae. Fugit reprehenderit quia similique. Officia, quibusdam. Earum, accusantium ipsa culpa pariatur quisquam harum doloremque saepe nobis aut. Ratione vero officiis ad incidunt aliquid repellat soluta ducimus voluptatum, quas, nisi saepe eius rem eaque corrupti earum recusandae, tenetur atque ipsam repudiandae quae fuga ut. Fuga repudiandae nesciunt molestias, nulla a, id nisi doloribus nemo fugit voluptatibus dignissimos? Iusto architecto alias magnam necessitatibus error ullam temporibus? Molestias provident sunt rerum minus, animi repudiandae, ratione consequuntur deserunt quaerat dolores nihil distinctio adipisci blanditiis similique dolorum. Quisquam at perspiciatis atque modi iure tempora veniam, deleniti vero explicabo. Voluptatibus nihil vel facilis ab!</p>
                        </div> */}
                        {/* Reference to the last message */}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                {/* input */}
                <form className='flex w-full min-h-[38px] border p-1 gap-2'>
                    <input type="text" className='w-full px-2' />
                    <button className='px-2 py-1 bg-my-acct text-my-text font-bold flex gap-1 hover:bg-my-btn-hover'><BiSolidMessageAdd className="text-xl" />Send</button>
                </form>
            </div>
            {/* button */}
            <div className="w-full h-[40px mb-10 flex justify-center text-my-text font-bold gap-5">
                <button className="bg-my-acct hover:bg-my-btn-hover px-3 py-1 w-[150px]"
                    onClick={hdlShowOffer}>Accept</button>
                <button className="bg-my-acct hover:bg-my-btn-hover px-3 py-1 w-[150px]">Update</button>
                <button className="bg-my-prim hover:bg-my-prim-hover px-3 py-1 w-[150px]">Cancel</button>
            </div>
            {/* show offer */}
            <ShowOffer ctrlShowOffer={ctrlShowOffer} setCtrlShowOffer={setCtrlShowOffer} />
        </div>
    )
}
