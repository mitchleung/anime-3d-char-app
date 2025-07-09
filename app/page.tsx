"use client";
import dynamic from "next/dynamic";

const DynamicGLBModelViewer = dynamic(() => import("../components/GLBModelViewer"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <div className="w-full h-screen relative z-5 bg-gradient-to-br from-gray-400 to-gray-800 text-white flex items-center justify-center">
        <div className="max-w-full space-y-4 mx-auto px-8 sm:px-12 lg:px-16">
          <h1 className="font-extrabold tracking-tight text-4xl md:text-6xl lg:text-7xl leading-tight text-center">
            Transform 2D image to interactive 3D model
          </h1>
          <ul className="md:text-xl lg:text-2xl font-normal leading-normal max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl list-disc space-y-2 mx-auto px-8">
            <li className="list-item">Use <a href="https://chatgpt.com/" target="_blank" rel="noopener" className="border-b-2 border-b-sky-500">ChatGPT</a> or alike to generate 3D image from text prompt “Create a 3D image model of a [object] with a white background”</li>
            <li className="list-item">Convert to 3D model using <a href="https://www.meshy.ai/" target="_blank" rel="noopener" className="border-b-2 border-b-sky-500">Meshy.ai</a> in 2 steps:
              <ol className="list-decimal mx-8">
                <li className="list-item">Convert 2D PNG to generate 4 GLB models</li>
                <li className="list-item">Choose the best looking model that suit your need and click on it to generate texture</li>
                <li className="list-item">Download the final colored 3d Model in GLB format</li>
              </ol>
            </li>
            <li className="list-item">Use <a href="https://threejs.org" target="_blank" rel="noopener" className="border-b-2 border-b-sky-500">Three.js</a> to import the GLB and animate the object on scroll.</li>
          </ul>
        </div>
      </div>

      <DynamicGLBModelViewer position={[0, 0, 0]} scale={[2, 2, 2]} modelPath="/doreamon.glb" modelTitle="Doraemon" className="bg-gradient-to-br from-sky-200 to-sky-900" />

      <div className="h-screen relative z-5 bg-gradient-to-tl from-gray-500 to-gray-800 text-white flex items-center justify-center text-4xl font-extrabold tracking-tight">
        <h2 className="text-5xl md:text-7xl lg:text-8xl leading-tight text-center">
          Content in-between <br /> 3D Hero
        </h2>
      </div>

      <DynamicGLBModelViewer position={[0, 0, 0]} scale={[2, 2, 2]} modelPath="/rilakkuma.glb" modelTitle="Rilakkuma" className="bg-gradient-to-br from-amber-200 to-amber-900" />

      <div className="h-screen relative z-5 bg-gradient-to-tl from-gray-500 to-gray-800 text-white flex items-center justify-center text-4xl font-extrabold tracking-tight">
        <h3 className="text-5xl md:text-7xl lg:text-8xl leading-tight text-center">
          Content After <br /> 3D Hero
        </h3>
      </div>
    </>
  );
}