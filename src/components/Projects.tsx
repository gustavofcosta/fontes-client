import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/app.Context";
import axios from "../services/axios";
import Loading from "./Loading";
import Project from "./Project";

export interface ProjectProps {
  id: string;
  title: string;
  zip_code: number;
  cost: number;
  // deadline: any;
  done: boolean;
}

const Projects = () => {
  const { getAllProjects, allProjects, loading } = useGlobalContext();

  useEffect(() => {
    getAllProjects();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-8">
      {allProjects.map((project) => {
        return <Project key={project.id} {...project} />;
      })}
    </div>
  );
};

export default Projects;
