"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Position,
} from "reactflow";

import { CourseNode, SelectionNode } from "../components";

import "reactflow/dist/style.css";

import { Space_Mono } from "next/font/google";

import curriculum from "../../colby-curriculum.json";

import { useSelector } from "react-redux";

const SpaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"] });

export default function Home() {
  const COURSES = curriculum.map((obj) => ({
    ...obj,
    Department: obj.Course.slice(0, 2),
  }));

  const department = useSelector(
    (state: { department: string }) => state.department
  );

  useEffect(() => {
    // Call the function initially
    createNodes(department);

    // Subscribe to store changes and call the function whenever the store value changes
    return () => {
      // Cleanup function: unsubscribe from store changes
    };
  }, [department]);

  const createNodes = (department: string) => {
    const newCoursesNodes: Node[] = COURSES.map(
      ({
        Course,
        Section,
        Cr,
        Days,
        Times,
        Title,
        DistReq,
        Diversity,
        Room,
        Reg,
        Max,
        Exam,
        Faculty,
      }) => {
        console.log(Course.slice(0,2))
        const node = {
          id: Course + " " + Section + "" + Days + "" + Times,
          type: "course",
          draggable: true,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          data: {
            Course,
            Section,
            Cr,
            Days,
            Times,
            Title,
            DistReq,
            Diversity,
            Room,
            Reg,
            Max,
            Exam,
            Faculty,
          },
          position: { x: 500, y: 100 },
        };
        return node;
      }
    )
      .filter(({ id }: { id: string }) => id.slice(0, 2) == department)
      .map((obj: Node, index) => {
        return { ...obj, position: { x: 500, y: 220 * index } };
      });

    setCoursesNodes(newCoursesNodes);

    setNodes([
      {
        id: "m",
        type: "selection",
        sourcePosition: Position.Right,
        draggable: true,
        data: { label: "mainNode" },
        position: { x: 0, y: 300 },
      },
      ...newCoursesNodes,
    ]);
  };

  const [coursesNodes, setCoursesNodes] = useState<Node[]>([]);

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "m",
      type: "selection",
      sourcePosition: Position.Right,
      draggable: true,
      data: { label: "Main Node" },
      position: { x: 0, y: 300 },
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setEdges(
      coursesNodes.map(({ id }: { id: string }) => {
        const edge = {
          id: `${id.slice(0, 2)}-${id}`,
          source: "m",
          target: id,
        };
        return edge;
      })
    );
  }, [nodes]);

  const nodeTypes = useMemo(
    () => ({
      course: CourseNode,
      selection: SelectionNode,
    }),
    []
  );

  return (
    <div className={SpaceMono.className}>
      <div className="w-screen h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
        >
          <MiniMap zoomable pannable />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}
