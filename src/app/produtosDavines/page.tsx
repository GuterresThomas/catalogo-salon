/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/menuBar'
export default function Page() {
  // Função para buscar os produtos do arquivo JSON
  const fetchProducts = async () => {
    const res = await fetch('/data.json');
    const data = await res.json();
    console.log("aaaa", data);
    return data;
  };

  const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedLine, setSelectedLine] = useState<string>('EssentialHaircare');

    useEffect(() => {
      // Função para carregar os produtos ao selecionar uma linha
      const loadProducts = async () => {
        const data = await fetchProducts();
        setProducts(data[selectedLine]);
      };
      loadProducts();
    }, [selectedLine]);

    return (
      <div className="container mx-auto px-4 py-6">
        {/* Dropdown para escolher a linha de produtos */}
        <div className="mb-6">
          <label htmlFor="line-select" className="block text-lg font-medium text-gray-700 mb-2">
            Selecione a linha de produtos:
          </label>
          <select
            id="line-select"
            value={selectedLine}
            onChange={(e) => setSelectedLine(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="EssentialHaircare">Essential Haircare</option>
            <option value="OI">OI</option>
            <option value="Naturaltech">Natural Tech</option>
          </select>
        </div>

        {/* Exibir os produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg  transition-transform duration-300 hover:scale-110"
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold mb-2">R$ {product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{product.volume}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderizando o ProductList dentro do Page
  return (
    <div>
      <MenuBar/>
      <h1 className="text-3xl font-bold text-center mb-6">Nossos Produtos Davines</h1>
      <ProductList />
    </div>
  );
}
