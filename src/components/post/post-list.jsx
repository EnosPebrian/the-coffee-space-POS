import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../API/api';
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { ModalInputProduct } from './post-modal';
import { PostCard } from './post-card';
import { Search2Icon } from '@chakra-ui/icons';

export const PostList = ({ isOpen, onOpen, onClose }) => {
  const userSelector = useSelector((state) => state.auth);
  const [sort, setSort] = useState({ orderBy: '', sortBy: '' });
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const toast = useToast();

  const fetchSearch = async () => {
    return api
      .get('/products/search', {
        params: {
          productName: search,
          ...sort,
        },
      })
      .then((res) => {
        setProducts(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSearch();
  }, [search, sort]);

  const debouncedSearch = useCallback(
    debounce((query) => setSearch(query), 500),
    []
  );

  const doSearch = (query) => {
    debouncedSearch(query);
  };

  const handleSortChange = (e) => {
    const value = e.target.value.split('-');
    setSort({ orderBy: value[0], sortBy: value[1] });
  };

  return (
    <div>
      <div className='flex relative'>
        <div className='absolute left-3 top-3'>
          <Search2Icon className='w-5 h-5 mb-2  text-gray-400' />
        </div>
        <input
          type='text'
          placeholder='Search for products...'
          className='border rounded-lg pl-12 mr-2 text-left border-none outline-none'
          onChange={(e) => doSearch(e.target.value)}
        />
        <div className='px-2 py-2 border rounded-lg mr-2'>
          <select
            className='border-none outline-none'
            defaultValue={''}
            onChange={handleSortChange}
          >
            <option className='' value=''>
              Filter
            </option>
            <option value='productName-asc'>Product Name A-Z</option>
            <option value='productName-desc'>Product Name Z-A</option>
            <option value='price-asc'>Price A-Z</option>
            <option value='price-desc'>Price Z-A</option>
          </select>
        </div>
        <div className='px-2 py-2 border rounded-lg'>
          <select
            className='border-none outline-none'
            defaultValue={''}
            onChange={handleSortChange}
          >
            <option className='' value=''>
              Category
            </option>
            <option value='productName-asc'>Beverages</option>
            <option value='productName-desc'>Foods</option>
          </select>
        </div>
      </div>
      <table className='border mt-8 w-full text-center'>
        <thead>
          <tr>
            <th className='px-4 py-2 '>ID</th>
            <th className='px-4 py-2 '>Image</th>
            <th className='px-4 py-2 '>Product</th>
            <th className='px-4 py-2 '>Price</th>
            <th className='px-4 py-2 '>Stock</th>
            <th className='px-4 py-2 '>Description</th>
            <th className='px-4 py-2 ' colSpan='2'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <PostCard product={product} fetchProducts={fetchSearch} />
          ))}
        </tbody>
      </table>
      <ModalInputProduct
        isOpen={isOpen}
        fetchProducts={fetchSearch}
        onClose={onClose}
      />
    </div>
  );
};
